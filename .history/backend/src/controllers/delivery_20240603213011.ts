import Delivery, { getAvailableDelivery } from "../db/delivery";
import { getAddressById } from "../db/addresses";
import wss from "../ws_server";
import url from "url";
import Order from "../db/orders";
import { getRestaurantById } from "../db/restaurants";
import { getUserById } from "../db/users";
import { createNotification } from "../db/notifications";

export const getAvailableDeliveriesByCity = async (address_id: number) => {
  const deliveries = await getAvailableDelivery();
  if (deliveries.length === 0) return null;

  const address = await getAddressById(address_id);

  if (!address) return null;

  const city = address.city;

  deliveries.filter(async (delivery) => {
    const address = await getAddressById(delivery.address_id);
    if (address && address.city === city) {
      return delivery;
    } else {
      return null;
    }
  });
  return deliveries;
};

export const askForDelivery = async (deliveries: Delivery[], order: Order) => {
  if (deliveries.length === 0) return null;

  //envoie de message au livreur partie server
  wss.on("connection", async (ws: WebSocket, req) => {
    if (!req.url) return null;

    const params = new url.URL(req.url, `http://${req.headers.host}`)
      .searchParams;
    const userId = Number(params.get("userId"));

    if (!userId) {
      console.error("No userId provided");
      return null;
    }

    const delivery = deliveries.find((user) => user.id === userId);

    if (!delivery) {
      console.error("Delivery not found");
      return null;
    }

    const restaurant = await getRestaurantById(order.restaurant_id);

    if (!restaurant) {
      console.error("Restaurant not found");
      return null;
    }

    const restaurant_address = getAddressById(order.address_id);

    if (!restaurant_address) {
      console.error("Restaurant address not found");
      return null;
    }

    const order_address = getAddressById(order.address_id);

    if (!order_address) {
      console.error("Order address not found");
      return null;
    }

    const client = await getUserById(order.user_id);
    if (!client) {
      console.error("Client not found");
      return null;
    }

    //resto, adresse resto, client, addresse client, id

    // Envoyer une notification au client
    const message = {
      type: "delivery",
      order_id: order.id,
      restaurant: restaurant.name,
      restaurant_address: restaurant_address,
      order_address: order_address,
      username: client.username,
    };

    const notification = await createNotification({
      user_id: userId,
      message: JSON.stringify(message),
    });
    if (!notification) {
      console.error("Notification not created");
      return null;
    }

    ws.send(JSON.stringify(message));

    // Écoutez les messages entrants du client
    wss.on("message", async (message: string) => {
      notification.read = true;
      await notification.save();
      if (message == "ok") {
        order.status = "pending delivery";
        await order.save();
        return delivery;
      } else {
        return null;
      }
    });
  });
};
