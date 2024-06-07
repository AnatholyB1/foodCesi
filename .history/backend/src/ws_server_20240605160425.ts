import WebSocket from "ws";
import url from "url";
import { createNotification } from "./db/notifications";
const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", async (ws, req) => {
  if (!req.url) return null;

  const params = new url.URL(req.url, `http://${req.headers.host}`)
    .searchParams;
  const userId = Number(params.get("userId"));

  if (!userId) {
    console.error("No userId provided");
    return null;
  }

  ws.on("orderRequest", async (message: string) => {
    const { restaurant_id, address, order_items, user, notification } = JSON.parse(message);

    const restaurant_message = {
      type: "order",
      restaurant_id,
      username: user.username,
      user_id: user.id,
      address,
      order_items,
    };

    const restaurant_notification = await createNotification({
      user_id: userId,
      message: JSON.stringify(restaurant_message),
    });
    if (!notification) {
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
    const { delivery, response, order, restaurant, restaurant_address, order_address, client, notification } = JSON.parse(message);

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
    const { order, restaurant, restaurant_address, order_address, client, delivery, notification } = JSON.parse(message);

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
    const { delivery, order, restaurant, restaurant_address, order_address, client, notification } = JSON.parse(message);

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
    const { delivery, order, restaurant, restaurant_address, order_address, client, notification } = JSON.parse(message);

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




