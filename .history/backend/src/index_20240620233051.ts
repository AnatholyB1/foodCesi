import express, { response } from "express";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import sequelize from "./db";

import router from "./router/index";
import WebSocket from "ws";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { setTimeout } from "timers";
import Order, { getOrderById } from "./db/orders";
import { createNotification, getNotificationById } from "./db/notifications";
import { getAvailableDeliveriesByCity } from "./controllers/delivery";

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
  ws: WebSocket;
  id: string;
}[] = [];
wss.on("connection", async (ws) => {
  ws.on("close", () => {
    // Remove the closed client from the clients array
    clients = clients.filter((client) => client.ws !== ws);
  });

  ws.on("message", async (message: string) => {
    const { type, data } = JSON.parse(message);

    switch (type) {
      case "connectionType": {
        const client = {
          type: data.type,
          id: data.id,
          ws,
        };
        clients.push(client);
        console.log(`New ${data.type} ${data.id} connected`);
        break;
      }

      case "orderRequest": {
        const { restaurant_id, address, order_items, user, order_id } = data;

        console.log("Order request received to server from user");

        const ws_restaurant = clients.find(
          (client) =>
            client.type === "restaurant" &&
            client.id === restaurant_id.toString()
        )?.ws;
        if (!ws_restaurant) {
          console.error("No restaurant connected");
          break;
        }

        const restaurant_message = {
          type: "orderRequest",
          order_id,
          restaurant_id,
          username: user.username,
          user_id: user.id,
          address,
          order_items,
        };

        const restaurant_notification = await createNotification({
          userId: restaurant_id,
          message: JSON.stringify(restaurant_message),
          from: "user",
          type: "orderRequest",
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
        ws_restaurant.send(response2);

        console.log("Order request sent to restaurant from server");

        break;
      }
      case "orderResponse": {
        console.log("Order response received to server from restaurant");
        const { order_id, response, notification_id } = data;

        const previous_notification = await getNotificationById(
          notification_id
        );
        if (!previous_notification) {
          console.error("Notification not found");
          break;
        }

        previous_notification.read = true;
        await previous_notification.save();

        const order = await getOrderById(order_id);
        if (!order) {
          console.error("Order not found");
          break;
        }

        const ws_user = clients.find(
          (client) =>
            client.type === "user" && client.id === order.user_id.toString()
        )?.ws;
        if (!ws_user) {
          console.error("No user connected");
          break;
        }

        const deliveries = await getAvailableDeliveriesByCity(order.address_id);
        if (!deliveries || deliveries.length == 0) {
          console.error("No delivery available");
          break;
        }

        const deliveries_id = deliveries.map((delivery) => delivery.id);

        const ws_delivery = clients
          .filter(
            (client) =>
              client.type === "delivery" &&
              client.ws &&
              deliveries_id.includes(Number(client.id))
          )
          .map((client) => client.ws);

        if (!ws_delivery || ws_delivery.length == 0) {
          console.error("No delivery connected");
          break;
        }

        if (response === "ok") {
          order.status = "validated";
        } else {
          order.status = "cancelled";
        }

        await order.save();

        const new_notification = await createNotification({
          userId: order.user_id,
          message: JSON.stringify({
            type: "restaurantResponse",
            order,
          }),
          from: "restaurant",
          type: "restaurantResponse",
        });

        if (!new_notification) {
          console.error("Notification not created");
          break;
        }

        const user_message = {
          type: "restaurantResponse",
          notification: new_notification,
        };

        ws_user.send(JSON.stringify(user_message));

        console.log("Order response sent to user from server");

        if (response !== "ok") {
          break;
        }

        const delivery_notification = await createNotification({
          userId: order.restaurant_id,
          message: JSON.stringify({
            type: "deliveryRequest",
            order,
          }),
          from: "restaurant",
          type: "deliveryRequest",
        });

        const delivery_message = {
          type: "deliveryRequest",
          notification: delivery_notification,
        };

        ws_delivery.forEach((ws) => ws.send(JSON.stringify(delivery_message)));

        console.log("Delivery request sent to delivery from server");
        break;
      }
      case "deliveryResponse": {
        interface IData {
          type: string;
          order: Order;
          response: string;
          delivery_id: string;
        }
        const data_typed: IData = data;

        const { order, response, delivery_id } = data_typed;

        console.log("Delivery response received to server from delivery");

        if (response !== "ok") {
          break;
        }

        const working_order = await getOrderById(order.id);
        if (!working_order) {
          console.error("Order not found");
          break;
        }

        working_order.status = "pending delivery";
        working_order.delivery_id = Number(delivery_id);
        await working_order.save();

        const ws_user = clients.find(
          (client) =>
            client.type === "user" &&
            client.id === working_order.user_id.toString()
        )?.ws;

        if (!ws_user) {
          console.error("No user connected");
          break;
        }

        const user_notification = await createNotification({
          userId: order.user_id,
          message: JSON.stringify({
            type: "deliveryResponse",
            order: working_order,
          }),
          from: "delivery",
          type: "deliveryResponse",
        });

        const user_message = {
          type: "deliveryResponse",
          notification: user_notification,
        };

        ws_user.send(JSON.stringify(user_message));

        console.log("Delivery response sent to user from server");

        break;
      }
      case "restaurantReady": {

        console.log("Restaurant ready received to server from restaurant");
        const {
          order
        } = data

        const delivery_notification = await createNotification({
          userId: order.user_id,
          message: JSON.stringify({
            type: "restaurantReady",
            order,
          }),
          from: "restaurant",
          type: "restaurantReady",
        });

        const delivery_message = {
          type: "restaurantReady",
          notification: delivery_notification,
        };

        const ws_delivery = clients.find(
          (client) =>
            client.type === "delivery" &&
            client.id === order.delivery_id.toString()
        )?.ws;

        if (!ws_delivery) {
          console.error("No delivery connected");
          break;
        }

        ws_delivery.send(JSON.stringify(delivery_message));

        console.log("Restaurant ready sent to delivery from server");

        const user_notification = await createNotification({
          userId: order.user_id,
          message: JSON.stringify({
            type: "restaurantReady",
            order,
          }),
          from: "restaurant",
          type: "restaurantReady",
        });

        const user_message = {
          type: "restaurantReady",
          notification: user_notification,
        };

        const ws_user = clients.find(
          (client) =>
            client.type === "user" &&
            client.id === order.user_id.toString()
        )?.ws;

        if (!ws_user) {
          console.error("No user connected");
          break;
        }


        ws_user.send(JSON.stringify(user_message));


        break;
      }
      case "deliveryReady": {
        const {
          order
        } = data


        console.log("Delivery ready received to server from delivery");

        const user_notification = await createNotification({
          userId: order.user_id,
          message: JSON.stringify({
            type: "deliveryReady",
            order,
          }),
          from: "delivery",
          type: "deliveryReady",
        });

        const user_message = {
          type: "deliveryReady",
          notification: user_notification,
        };

        const ws_user = clients.find(
          (client) =>
            client.type === "user" &&
            client.id === order.user_id.toString()
        )?.ws;

        if (!ws_user) {
          console.error("No user connected");
          break;
        }

        ws_user.send(JSON.stringify(user_message));

        console.log("Delivery ready sent to user from server");

        const restaurant_notification = await createNotification({
          userId: order.user_id,
          message: JSON.stringify({
            type: "deliveryReady",
            order,
          }),
          from: "delivery",
          type: "deliveryReady",
        });

        const restaurant_message = {
          type: "deliveryReady",
          notification: restaurant_notification,
        };

        const ws_restaurant = clients.find(
          (client) =>
            client.type === "restaurant" &&
            client.id === order.restaurant_id.toString()
        )?.ws;

        if (!ws_restaurant) {
          console.error("No restaurant connected");
          break;
        }

        ws_restaurant.send(JSON.stringify(restaurant_message));

        console.log("Delivery ready sent to restaurant from server");

        break;
      }
      case "deliveryDeparture": {
        const {
          order : temp_order
        } = data

        console.log("Delivery departure received to server from delivery");

        const order = await getOrderById(temp_order.id);
        if (!order) {
          console.error("Order not found");
          break;
        }

        order.status = "delivery";
        await order.save();

        const user_notification = await createNotification({
          userId: order.user_id,
          message: JSON.stringify({
            type: "deliveryDeparture",
            order,
          }),
          from: "delivery",
          type: "deliveryDeparture",
        });

        const user_message = {
          type: "deliveryDeparture",
          notification: user_notification,
        };

        const ws_user = clients.find(
          (client) =>
            client.type === "user" &&
            client.id === order.user_id.toString()
        )?.ws;

        if (!ws_user) {
          console.error("No user connected");
          break;
        }

        ws_user.send(JSON.stringify(user_message));

        console.log("Delivery departure sent to user from server");
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
      type: "connectionType",
      data: {
        type: "user",
        id: "1",
      },
    };

    wsUser.send(JSON.stringify(message));
  };

  wsUser.onmessage = (event) => {
    //parse a buffer
    const dataResponse = JSON.parse(event.data.toString());
    const info = JSON.parse(dataResponse.notification.message);

    switch (dataResponse.type) {
      case "restaurantResponse":
        console.log("Restaurant response received to user");
        console.log("order status " + info.order.status);
        break;
      case "deliveryResponse":
        console.log("Delivery response received");
        console.log("order status " + info.order.status);

        const info_restaurant_ready = {
          type: "restaurantReady",
          data :{
            order: info.order,
          }
        };
        wsRestaurant.send(JSON.stringify(info_restaurant_ready) );

        const info_delivery_ready = {
          type: "deliveryReady",
          data : {
            order: info.order,
          }
        };
        wsDelivery.send(JSON.stringify(info_delivery_ready) );

        const info_delivery_departure = {
          type: "deliveryDeparture",
          data :{
            order: info.order,
          }
        };

        wsDelivery.send(JSON.stringify(info_delivery_departure) );
        break;
      case "restaurantReady":
        console.log("Restaurant ready received");
        console.log("order status " + info.order.status);
        break;

      case "deliveryReady":
        console.log("Delivery ready received");
        console.log("order status " + info.order.status);
        break;

      case "deliveryDeparture":
        console.log("Delivery departure received");
        console.log("order status " + info.order.status);
        break;
      default:
        console.log("Unknown message type to user");
    }
  };

  const wsRestaurant = new WebSocket("ws://localhost:8000");

  wsRestaurant.onopen = () => {
    const message = {
      type: "connectionType",
      data: {
        type: "restaurant",
        id: "1",
      },
    };

    wsRestaurant.send(JSON.stringify(message));
  };

  wsRestaurant.onmessage = (event) => {
    //parse a buffer
    const dataResponse = JSON.parse(event.data.toString());
    const info = JSON.parse(dataResponse.notification.message);

    switch (dataResponse.type) {
      case "orderRequest":
        console.log("Order request received to restaurant");
        const message = {
          type: "orderResponse",
          data: {
            order_id: info.order_id,
            response: "ok",
            notification_id: dataResponse.notification._id,
          },
        };

        wsRestaurant.send(JSON.stringify(message));
        console.log("Order response sent to server from restaurant");
        break;
      case "deliveryReady":
        console.log("Delivery ready received to restaurant");
        console.log("order status " + info.order.status);
        break;  
      default:
        console.log("Unknown message type to restaurant");
    }
  };

  const wsDelivery = new WebSocket("ws://localhost:8000");

  wsDelivery.onopen = () => {
    const message = {
      type: "connectionType",
      data: {
        type: "delivery",
        id: "1",
      },
    };

    wsDelivery.send(JSON.stringify(message));
  };

  wsDelivery.onmessage = (event) => {
    //parse a buffer
    const dataResponse = JSON.parse(event.data.toString());
    const info = JSON.parse(dataResponse.notification.message);

    switch (dataResponse.type) {
      case "deliveryRequest":
        console.log("Delivery request received to delivery");
        const message = {
          type: "deliveryResponse",
          data: {
            ...info,
            response: "ok",
            delivery_id: "1",
          },
        };

        wsDelivery.send(JSON.stringify(message));
        console.log("Delivery response sent to server from delivery");
        break;
      case "restaurantReady":
        console.log("Restaurant ready received to delivery");
        console.log("order status " + info.order.status);
        break;
      default:
        console.log("Unknown message type to delivery");
    }
  };
}, 1000);
