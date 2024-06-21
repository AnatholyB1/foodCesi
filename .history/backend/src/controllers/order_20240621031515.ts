import express from "express";
import Order, {
  getOrderById,
  createOrder,
  updateOrder,
  getOrdersByUserId,
  getOrdersByDeliveryId,
  getOrdersByRestaurantId,
  deleteOrder,
  deleteOrdersByUserId,
} from "../db/orders";
import { withLogging } from "../helpers";
import Restaurant, { getRestaurantById } from "../db/restaurants";
import User, { getUserById } from "../db/users";
import Address, { getAddressById } from "../db/addresses";
import OrderItem, { createOrderItem } from "../db/orders_items";
import WebSocket from "ws";
import Delivery from "../db/delivery";

export const getAllOrders = withLogging(
  "getAllOrders",
  async (req: express.Request, res: express.Response) => {
    try {
      // Filtering
      let filter = {};
      if (typeof req.query.filter === "string") {
        filter = JSON.parse(req.query.filter);
      }

      // Sorting
      let sort: [string, string][] = [];
      if (typeof req.query.sort === "string") {
        const [sortField, sortOrder] = JSON.parse(req.query.sort);
        sort = [[sortField, sortOrder === "ASC" ? "ASC" : "DESC"]];
      }

      // Pagination
      let range = [0, 9]; // Default range
      if (typeof req.query.range === "string") {
        range = JSON.parse(req.query.range);
      }

      const { count: total, rows: orders } = await Order.findAndCountAll({
        where: filter,
        order: sort,
        offset: range[0],
        limit: range[1] - range[0] + 1,
        include:[Address,User,Delivery,Restaurant,OrderItem]
      });

      res.setHeader("Content-Range", `orders ${range[0]}-${range[1]}/${total}`);
      res.setHeader("Access-Control-Expose-Headers", "Content-Range");

      return res.status(200).json(orders);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getAllOrdersByRestaurantId = withLogging(
  "getOrdersByRestaurantId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { restaurant_id } = req.params;
      if (!restaurant_id) {
        return res.status(400).json({ message: "Missing restaurant_id" }).end();
      }
      const orders = await getOrdersByRestaurantId(Number(restaurant_id));

      if (!orders) {
        return res.status(404).json({ message: "Orders not found" }).end();
      }
      return res.status(200).json(orders).end();
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: "Error" }).end();
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

      const total_price = items.reduce(
        (acc: any, item: any) => acc + item.total_price,
        0
      );

      const order = {
        user_id,
        address_id,
        status: "pending",
        restaurant_id,
        total_price: total_price,
      };

      const newOrder = await createOrder(order);

      if (!newOrder) {
        return res.status(400).json({ message: "Order not created" });
      }

      const order_items: OrderItem[] = items.forEach(async (item: any) => {
        item.order_id = newOrder.id;
        const newItem = await createOrderItem(item);
        if (!newItem) {
          return res.status(400).json({ message: "Item not created" });
        }
        return newItem;
      });

      const ws = new WebSocket("ws://localhost:8000");

      ws.onopen = () => {

        const orderRequestMessage = {
          type: "orderRequest",
          data: {
            order_id: newOrder.id,
            restaurant_id,
            address,
            order_items,
            user,
          },
        };
        ws.send(JSON.stringify(orderRequestMessage));
        ws.close();
        return res.status(200).end();
      };

      ws.addEventListener("error", function (event) {
        console.log("WebSocket error: ", event);
        return res.status(500).end();
      });
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


export const getOrderCode = withLogging(
  "getOrderCode",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Missing order id" }).end();
      }
      const order = await getOrderById(Number(id));
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      const random4Digits = Math.floor(1000 + Math.random() * 9000);
      order.code = random4Digits;
      return res.status(200).json({ code: order.code }).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
);


export const compareOrderCode = withLogging(
  "compareOrderCode",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const {  code } = req.body;
      if (!code) {
        return res.status(400).json({ message: "Missing code" }).end();
      }
      if (!id) {
        return res.status(400).json({ message: "Missing order id" }).end();
      }
      const order = await getOrderById(Number(id));
      if (!order) {
        return res.status(404).json({ message: "Order not found" }).end();
      }
      console.log(order.code, code);
      if (order.code !== Number(code)) {
        return res.status(400).json({ message: "Code does not match" }).end();
      }
      return res.status(200).json({ message: "Code matches" }).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  }
);
