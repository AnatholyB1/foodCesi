import express from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import router from "./router/index";

const app = express();
const server = http.createServer(app);
dotenv.config();2
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

async function startServer() {
  await connectMongoDB();

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();

app.use(cookieParser());
app.use(bodyParser.json());
app.use("/", router());

import WebSocket from "ws";
import { createNotification } from "./db/notifications";
const wss = new WebSocket.Server({ server });

wss.on("connection", async (ws) => {
  ws.on("orderRequest", async (message: string) => {
    const { restaurant_id, address, order_items, user } =
      JSON.parse(message);

    const restaurant_message = {
      type: "order",
      restaurant_id,
      username: user.username,
      user_id: user.id,
      address,
      order_items,
    };

    const restaurant_notification = await createNotification({
      user_id: restaurant_id,
      message: JSON.stringify(restaurant_message),
    });
    if (!restaurant_notification) {
      console.error("Notification not created");
      return null;
    }

    ws.send(JSON.stringify(restaurant_notification));
  });

  ws.on("orderResponse", async (message: string) => {
    const { order, response, notification } = JSON.parse(message);
    notification.read = true;
    await notification.save();
    if (response == "ok") {
      order.status = "validated";
      await order.save();
      return true;
    } else {
      return null;
    }
  });

  ws.on("deliveryResponse", async (message: string) => {
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
      return true;
    } else {
      return null;
    }
  });

  ws.on("restaurantReady", async (message: string) => {
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
  });

  ws.on("deliveryDeparture", async (message: string) => {
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
  });

  ws.on("deliveryArrival", async (message: string) => {
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
  });
});

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
