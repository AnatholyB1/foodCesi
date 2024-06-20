import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import sequelize from "./db";

import router from "./router/index";
import WebSocket from "ws";
import { createNotification } from "./db/notifications";

const app = express();
const server = http.createServer(app);
dotenv.config();
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 8000;

const mongodbUrl = process.env.DATABASE_URL || "mongodb://database:27017/mydb";

// Fonction pour établir la connexion MongoDB
async function connectMongoDB() {
  try {
    await mongoose.connect(mongodbUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

const wss = new WebSocket.Server({ server });
let clients: {
  type: string;
  ws : WebSocket
}[] = [];
wss.on("connection", async (ws) => {

  ws.on('close', () => {
    // Remove the closed client from the clients array
    clients = clients.filter(client => client.ws !== ws);
  });

  ws.on("message", async (message: string) => {
    const { type, data } = JSON.parse(message);

    switch (type) {
      case "connectionType": {
        const client = {
          type: data,
          ws,
        };
        clients.push(client);
        console.log(`New ${data} connected`);
        break;
      }

      case "orderRequest": {
        const { restaurant_id, address, order_items, user } = data;

        const restaurant_message = {
          type: "order",
          restaurant_id,
          username: user.username,
          user_id: user.id,
          address,
          order_items,
        };

        const restaurant_notification = await createNotification({
          userId: restaurant_id,
          message: JSON.stringify(restaurant_message),
          from: "user"
        });
        if (!restaurant_notification) {
          console.error("Notification not created");
          return null;
        }
        const response = {
          type: "orderRequest",
          notification: restaurant_notification,
        };

        const response2 = JSON.stringify(response);
        for (let client of clients) {
          if (client.ws.readyState === WebSocket.OPEN  && client.type === "restaurant") {
            client.ws.send(response2);
          }
        }

        break;
      }
      case "orderResponse": {
        const { order, response, notification } = JSON.parse(message);
        notification.read = true;
        await notification.save();
        if (response == "ok") {
          order.status = "validated";
          await order.save();
        }
        break;
      }
      case "deliveryResponse": {
        const {
          delivery,
          response,
          order,
          restaurant,
          restaurant_address,
          order_address,
          client,
          notification,
        } = JSON.parse(message);

        const user_message = {
          type: "delivery",
          order_id: order.id,
          restaurant: restaurant.name,
          restaurant_address: restaurant_address,
          order_address: order_address,
          username: client.username,
        };
        notification.read = true;
        await notification.save();
        if (response == "ok") {
          delivery.status = "pending";
          await delivery.save();
        }
        break;
      }
      case "restaurantReady": {
        const {
          order,
          restaurant,
          restaurant_address,
          order_address,
          client,
          delivery,
          notification,
        } = JSON.parse(message);

        const user_message = {
          type: "delivery",
          order_id: order.id,
          restaurant: restaurant.name,
          restaurant_address: restaurant_address,
          order_address: order_address,
          username: client.username,
        };
        notification.read = true;
        await notification.save();

        delivery.status = "pending";
        await delivery.save();
        break;
      }
      case "deliveryDeparture": {
        const {
          delivery,
          order,
          restaurant,
          restaurant_address,
          order_address,
          client,
          notification,
        } = JSON.parse(message);

        const user_message = {
          type: "delivery",
          order_id: order.id,
          restaurant: restaurant.name,
          restaurant_address: restaurant_address,
          order_address: order_address,
          username: client.username,
        };
        notification.read = true;
        await notification.save();

        delivery.status = "on the way";
        await delivery.save();
        break;
      }
      case "deliveryArrival": {
        const {
          delivery,
          order,
          restaurant,
          restaurant_address,
          order_address,
          client,
          notification,
        } = JSON.parse(message);

        const user_message = {
          type: "delivery",
          order_id: order.id,
          restaurant: restaurant.name,
          restaurant_address: restaurant_address,
          order_address: order_address,
          username: client.username,
        };
        notification.read = true;
        await notification.save();

        delivery.status = "delivered";
        await delivery.save();
        break;
      }
      default: {
        console.log(`Received unknown event type: ${type}`);
      }
    }
  });
});

async function startServer() {
  await connectMongoDB();

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  app.use(express.static("uploads"));
}

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("db synced successfully.");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
startServer();

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { setTimeout } from "timers";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API cesiEats",
      description: "Documentation de l'API cesiEats",
      version: "1.0.0",
      contact: {
        name: "anatholyb@gmail.com",
      },
      servers: ["http://localhost:8000"],
    },
  },
  apis: ["./src/router/*.ts"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

setTimeout(() => {
  const wsUser = new WebSocket("ws://localhost:8000");

  wsUser.onopen = () => {
    const message = {
      type: 'connectionType',
      data: 'user'
    };
  
    wsUser.send(JSON.stringify(message));
  }

  wsUser.onmessage = (event) => {
    console.log(event.data);
  }

  const wsRestaurant = new WebSocket("ws://localhost:8000");

  wsRestaurant.onopen = () => {
    const message = {
      type: 'connectionType',
      data: 'restaurant'
    };
  
    wsRestaurant.send(JSON.stringify(message));
  }
  

  const wsDelivery = new WebSocket("ws://localhost:8000");

  wsDelivery.onopen = () => {
    const message = {
      type: 'connectionType',
      data: 'delivery'
    };
  
    wsDelivery.send(JSON.stringify(message));
  }

}, 1000);
