import express from "express";
import { withLogging } from "../helpers";
import {getMenuItems,getMenuItemById,getMenuItemsByRestaurantId,getMenuItemsByCategoryId,createMenuItem,updateMenuItem,deleteMenuItem, deleteMenuItemsByRestaurantId} from '../db/menu_items'

export const getItems = withLogging(
  "getItems",
  async (req: express.Request, res: express.Response) => {
    try {
      const items = await getMenuItems();
      if(!items) return res.status(404).end();
      res.json(items).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);

export const getItemById = withLogging(
  "getItemById",
  async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;
        if(!id) return res.status(400).end();
      const item = await getMenuItemById(parseInt(id));
      if(!item) return res.status(404).end();
      res.json(item).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);

export const getItemsByRestaurantId = withLogging(
  "getItemsByRestaurantId",
  async (req: express.Request, res: express.Response) => {
    try {
        const {restaurant_id} = req.params;
        if(!restaurant_id) return res.status(400).end();
      const items = await getMenuItemsByRestaurantId(parseInt(restaurant_id));
      if(!items) return res.status(404).end();
      res.json(items).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);

export const getItemsByCategoryId = withLogging(
  "getItemsByCategoryId",
  async (req: express.Request, res: express.Response) => {
    try {
        const {category_id} = req.params;
        if(!category_id) return res.status(400).end();
      const items = await getMenuItemsByCategoryId(parseInt(category_id));
      if(!items) return res.status(404).end();
      res.json(items).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);


export const createItem = withLogging(
  "createItem",
  async (req: express.Request, res: express.Response) => {
    try {
        const {restaurant_id, name, description, price, category_id, image_url, available} = req.body;
        if(!restaurant_id || !name || !description || !price || !category_id || !image_url || !available) return res.status(400).end();
        const new_item = {
            restaurant_id: parseInt(restaurant_id),
            name: name,
            description: description,
            price: parseFloat(price),
            category_id: parseInt(category_id),
            image_url: image_url,
            available: available
        }
      const item = await createMenuItem(new_item);
      if(!item) return res.status(404).end();
      res.json(item).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);


export const updateItem = withLogging(
  "updateItem",
  async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params
        const {restaurant_id, name, description, price, category_id, image_url, available} = req.body;

        if(!id || !restaurant_id || !name || !description || !price || !category_id || !image_url || !available) return res.status(400).end();

        const new_item = {
            restaurant_id: parseInt(restaurant_id),
            name: name,
            description: description,
            price: parseFloat(price),
            category_id: parseInt(category_id),
            image_url: image_url,
            available: available
        }
      const item = await updateMenuItem(parseInt(id),new_item);
      if(!item) return res.status(404).end();
      res.status(200).json(item).end();
    } catch (e) {
      res.status(500).json(e).end();
    }
  }
);

