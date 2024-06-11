import express from "express";
import { withLogging } from "../helpers";
import {
  getMenuItems,
  getMenuItemById,
  getMenuItemsByRestaurantId,
  getMenuItemsByCategoryId,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  deleteMenuItemsByRestaurantId,
  getRestaurantsByItemId
} from "../db/menu_items";

export const getItems = withLogging(
  "getItems",
  async (req: express.Request, res: express.Response) => {
    try {
      const items = await getMenuItems();
      if (!items) return res.status(404).json({message: "no items"}).end();
      return res.status(200).json(items).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const getItemById = withLogging(
  "getItemById",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      const item = await getMenuItemById(parseInt(id));
      if (!item) return res.status(404).end();
      return res.json(item).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const getItemsByRestaurantId = withLogging(
  "getItemsByRestaurantId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { restaurant_id } = req.params;
      if (!restaurant_id) return res.status(400).end();
      const items = await getMenuItemsByRestaurantId(parseInt(restaurant_id));
      if (!items) return res.status(404).end();
      return res.status(200).json(items).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const getItemsByCategoryId = withLogging(
  "getItemsByCategoryId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { category_id } = req.params;
      if (!category_id) return res.status(400).end();
      const items = await getMenuItemsByCategoryId(parseInt(category_id));
      if (!items) return res.status(404).end();
      return res.status(200).json(items).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const createItem = withLogging(
  "createItem",
  async (req: express.Request, res: express.Response) => {
    try {
      const {
        restaurant_id,
        name,
        description,
        price,
        category_id,
        image_url,
        available,
      } = req.body;

      if (
        !restaurant_id ||
        !name ||
        !description ||
        !price ||
        !category_id ||
        category_id.length = 0||
        !image_url ||
        !available
      )
        return res.status(400).json({message:"invalid parameters"}).end();
      const new_item = {
        restaurant_id: Number(restaurant_id),
        name: name,
        description: description,
        price: new Float32Array(price),
        image_url: image_url,
        available: available,
      };
      const item = await createMenuItem(new_item);
      if (!item) return res.status(404).end();

      const categories: Array<number> = category_id.map((id: string) => Number(id));

      await Promise.all(categories.map(async (category_id: number) => {
        await item.addCategory(category_id);
      }));
      return res.status(200).json(item).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const updateItem = withLogging(
  "updateItem",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const {
        restaurant_id,
        name,
        description,
        price,
        category_id,
        image_url,
        available,
      } = req.body;

      if (
        !id 
      )
        return res.status(400).end();

      const new_item = {
        restaurant_id: parseInt(restaurant_id),
        name: name,
        description: description,
        price: parseFloat(price),
        category_id: parseInt(category_id),
        image_url: image_url,
        available: available,
      };
      const item = await updateMenuItem(parseInt(id), new_item);
      if (!item) return res.status(404).end();
      return res.status(200).json(item).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const deleteItem = withLogging(
  "deleteItem",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).end();
      const item = await deleteMenuItem(parseInt(id));
      if (!item) return res.status(404).end();
      return res.status(200).json(item).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);


export const deleteItemsByRestaurantId = withLogging(
  "deleteItemsByRestaurantId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { restaurant_id } = req.params;
      if (!restaurant_id) return res.status(400).end();
      const items = await deleteMenuItemsByRestaurantId(parseInt(restaurant_id));
      if (!items) return res.status(404).end();
      return res.status(200).json(items).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);

export const getARestaurantByItemId = withLogging(
  "getRestaurantsByItemId",
  async (req: express.Request, res: express.Response) => {
    try {
      const { item_id } = req.params;
      if (!item_id) return res.status(400).end();
      const restaurant = await getRestaurantsByItemId(parseInt(item_id));
      if (!restaurant) return res.status(404).end();
      return res.status(200).json(restaurant).end();
    } catch (e) {
      return res.status(500).json(e).end();
    }
  }
);
