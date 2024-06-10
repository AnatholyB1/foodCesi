import express from "express";
import { withLogging } from "../helpers";
import {
  getRestaurantCategories,
  createRestaurantCategory,
  updateRestaurantCategory,
  getCategoriesByRestaurant,
  deleteRestaurantCategory,
} from "../db/restaurants_categories";

export const getAllRestaurantCategories = withLogging(
  "getAllRestaurantCategories",
  async (req: express.Request, res: express.Response) => {
    try {
      const restaurant_categories = await getRestaurantCategories();
      if (!restaurant_categories) {
        return res.status(404).end();
      }
      return res.status(200).json(restaurant_categories).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const getRestaurantCategory = withLogging(
  "getRestaurantCategory",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).end();
      }
      const restaurant_category = await getCategoriesByRestaurant(parseInt(id));
      if (!restaurant_category) {
        return res.status(404).end();
      }
      return res.status(200).json(restaurant_category).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const createRestaurantCategoryInfo = withLogging(
  "createRestaurantCategoryInfo",
  async (req: express.Request, res: express.Response) => {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({message:"body required"}).end();
      }
      const restaurant_category = await createRestaurantCategory({name});
      if (!restaurant_category) {
        return res.status(404).json({message:"restaurant_category not created"}).end();
      }
      return res.status(201).json(restaurant_category).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const updateRestaurantCategoryInfo = withLogging(
  "updateRestaurantCategoryInfo",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!id || !name) {
        return res.status(400).end();
      }
      const restaurant_category = await updateRestaurantCategory(parseInt(id), name);
      if (!restaurant_category) {
        return res.status(404).end();
      }
      return res.status(200).json(restaurant_category).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);

export const deleteRestaurantCategoryInfo = withLogging(
  "deleteRestaurantCategoryInfo",
  async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).end();
      }
      const restaurant_category = await deleteRestaurantCategory(parseInt(id));
      if (!restaurant_category) {
        return res.status(404).end();
      }
      return res.status(200).json(restaurant_category).end();
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);
