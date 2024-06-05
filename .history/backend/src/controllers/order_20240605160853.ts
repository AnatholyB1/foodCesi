import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  getOrdersByUserId,
  getOrdersByDeliveryId,
  deleteOrder,
  deleteOrdersByUserId,
} from "../db/orders";
import { withLogging } from "../helpers";
import { getRestaurantById } from "../db/restaurants";
import { getUserById } from "../db/users";
import { getAddressById } from "../db/addresses";
import OrderItem, { createOrderItem } from "../db/orders_items";
import WebSocket from "ws";


export const getAllOrders = withLogging(
  "getAllOrders",
  async (req: express.Request, res: express.Response) => {
    try {
      const orders = await getOrders();
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAnOrderById = withLogging(
  "getAnOrderById",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const order = await getOrderById(Number(id));
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

/*to create a new order a need to give information about the order , 
i need to give address, 
total price, 
status, 
link to restaurant, 
link to delivery, 
link to user, 
with the menu creation and link*/
export const createAnOrder = withLogging(
  "createAnOrder",
  async (req: express.Request, res: express.Response) => {
      try {
      const { restaurant_id, user_id, address_id, items } = req.body;

      if (
        !restaurant_id ||
        !user_id ||
        !address_id ||
        !items ||
        items.length === 0
      ) {
        return res.status(400).json({ message: "Missing information" });
      }

      const restaurant = await getRestaurantById(restaurant_id);

      if (!restaurant) {
        return res.status(400).json({ message: "Restaurant not found" });
      }

      const user = await getUserById(user_id);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const address = await getAddressById(address_id);

      if (!address) {
        return res.status(400).json({ message: "Address not found" });
      }

      const order_items: OrderItem[] = items.forEach(async (item: any) => {
        const newItem = await createOrderItem(item);
        if (!newItem) {
          return res.status(400).json({ message: "Item not created" });
        }
        return newItem;
      });


      const total_price = order_items.reduce(
        (acc, item) => acc + item.total_price,
        0
      );

      const order = {
        user_id,
        address_id,
        status: "pending",
        restaurant_id,
        total_price : total_price,
      };
      



      const newOrder = await createOrder(order)
      return res.status(200).json(newOrder)
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const updateAnOrder = withLogging(
  "updateAnOrder",
  async (req: express.Request, res: express.Response) => {
    try {
      const id = Number(req.params.id);
      const order = req.body;
      const updatedOrder = await updateOrder(id, order);
      return res.status(200).json(updatedOrder);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAllOrdersByUserId = withLogging(
  "getOrdersByUserId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { user_id } = req.params;
      const orders = await getOrdersByUserId(Number(user_id));
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAllOrdersByDeliveryId = withLogging(
  "getOrdersByDeliveryId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { delivery_id } = req.params;
      const orders = await getOrdersByDeliveryId(Number(delivery_id));
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteAnOrder = withLogging(
  "deleteAnOrder",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const order = await deleteOrder(Number(id));
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteAllOrdersByUserId = withLogging(
  "deleteOrdersByUserId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { user_id } = req.params;
      const orders = await deleteOrdersByUserId(Number(user_id));
      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);
