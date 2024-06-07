import express from "express";
import {
  getRestaurants,
  getRestaurantById,
  getRestaurantsByUserId,
  deleteRestaurantByUserId,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../db/restaurants";
import { createAddress, getAddressById, updateAddress } from "../db/addresses";
import { withLogging } from "../helpers";
import Order from "../db/orders";
import OrderItem from "../db/orders_items";

import url from "url";

export const getAllRestaurants = withLogging(
  "getAllRestaurants",
  async (req: express.Request, res: express.Response) => {
    try {
      const restaurants = await getRestaurants();
      return res.status(200).json(restaurants);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getARestaurantById = withLogging(
  "getARestaurantById",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const restaurant = await getRestaurantById(Number(id));
      return res.status(200).json(restaurant);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getRestaurantsByUser = withLogging(
  "getRestaurantsByUser",
  async (req: express.Request, res: express.Response) => {
    try {
      const { user_id } = req.params;
      const restaurants = await getRestaurantsByUserId(Number(user_id));
      return res.status(200).json(restaurants);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const createARestaurant = withLogging(
  "createARestaurant",
  async (req: express.Request, res: express.Response) => {
    try {
      const {
        user_id,
        name,
        street,
        city,
        state,
        zip_code,
        country,
        phone_number,
        categories,
      } = req.body;

      if (
        !user_id ||
        !name ||
        !street ||
        !city ||
        !state ||
        !zip_code ||
        !country ||
        !phone_number ||
        !categories ||
        categories.length === 0
      ) {
        return res.status(400).json({ message: "Missing information" });
      }

      const address = {
        user_id,
        street,
        city,
        state,
        zip_code,
        country,
      };

      const new_address = await createAddress(address);

      if (!new_address) {
        return res.status(400).json({ message: "Address not created" });
      }

      const restaurant = {
        user_id,
        address_id: new_address.id,
        name,
        phone_number,
        categories,
      };

      const newRestaurant = await createRestaurant(restaurant);
      if (!newRestaurant) {
        return res.status(400).json({ message: "Restaurant not created" });
      }

      const return_address = {
        ...new_address,
        ...newRestaurant,
      };

      return res.status(200).json(return_address);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const updateARestaurant = withLogging(
  "updateARestaurant",
  async (req: express.Request, res: express.Response) => {
    try {
      const id = Number(req.params.id);
      const {
        user_id,
        name,
        street,
        city,
        state,
        zip_code,
        country,
        address_id,
        phone_number,
        categories,
      } = req.body;

      const updated_address = {
        street,
        city,
        state,
        zip_code,
        country,
      };

      if (address_id) {
        const address = await getAddressById(Number(address_id));
        if (!address) {
          return res.status(400).json({ message: "Address not found" });
        }
        const new_address = await updateAddress(
          Number(address_id),
          updated_address
        );
        if (!new_address) {
          return res.status(400).json({ message: "Address not updated" });
        }
      }

      const body = {
        user_id,
        name,
        address_id,
        phone_number,
        categories,
      };

      const updatedRestaurant = await updateRestaurant(id, body);

      if (!updatedRestaurant) {
        return res.status(400).json({ message: "Restaurant not updated" });
      }

      const return_info = {
        ...updated_address,
        ...updatedRestaurant,
      };
      return res.status(200).json(return_info);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteARestaurant = withLogging(
  "deleteARestaurant",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const restaurant = await deleteRestaurant(Number(id));
      return res.status(200).json(restaurant);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteAllRestaurantsByUserId = withLogging(
  "deleteAllRestaurantsByUserId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { user_id } = req.params;
      const restaurants = await deleteRestaurantByUserId(Number(user_id));
      return res.status(200).json(restaurants);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);



export const askRestaurantForDelivery = (
  restaurant_id: number,
  order: Order,
  order_items: OrderItem
) => {
  // send message to restaurant
};
