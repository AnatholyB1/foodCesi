import express from "express";
import Restaurant, {
  getRestaurants,
  getRestaurantById,
  getRestaurantsByUserId,
  deleteRestaurantByUserId,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "../db/restaurants";
import {
  addCategoryToRestaurant,
  removeCategoryFromRestaurant,
  getCategoriesByRestaurant,
} from "../db/restaurants_categories";
import { createAddress, getAddressById, updateAddress } from "../db/addresses";
import { withLogging } from "../helpers";
import Category from "../db/category";

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
        return res.status(400).json({ message: "Missing information" }).end();
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
        return res.status(400).json({ message: "Address not created" }).end();
      }

      const restaurant = {
        user_id,
        address_id: new_address.id,
        name,
        phone_number,
      };

      const newRestaurant = await createRestaurant(restaurant);
      if (!newRestaurant) {
        return res.status(400).json({ message: "Restaurant not created" }).end();
      }

      categories.forEach(async (id: string) => {
        const category_id = Number(id);
        const category = await Category.findByPk(category_id);

        if (!category) {
          return res.status(400).json({ message: "Category not found" }).end();
        }
        await addCategoryToRestaurant(newRestaurant.id, category.id);
      });

      return res.status(200).json(newRestaurant);
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
      };

      const updatedRestaurant = await updateRestaurant(id, body);

      if (!updatedRestaurant) {
        return res.status(400).json({ message: "Restaurant not updated" });
      }

      const current_categories = await getCategoriesByRestaurant(id);

      // Find the categories to add and the categories to remove
      const categoriesToAdd = categories.filter(
        (category: any) => !current_categories.includes(category)
      );
      const categoriesToRemove = current_categories.filter(
        (category: any) => !categories.includes(category)
      );

      // Get the restaurant
      const restaurant = await Restaurant.findByPk(id);

      if(!restaurant) {
        return res.status(404).json({ message: "no restaurant found"})
      }

      // Add the new categories
      for (const categoryName of categoriesToAdd) {
        const category = await Category.findOne({
          where: { name: categoryName },
        });
        if (category) {
          await restaurant.addCategory(category);
        }
      }

      // Remove the old categories
      for (const categoryName of categoriesToRemove) {
        const category = await Category.findOne({
          where: { name: categoryName },
        });
        if (category) {
          await restaurant.removeCategory(category);
        }
      }

      const return_info = {
        ...updated_address,
        ...updatedRestaurant,
        categories: categories,
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
      if(!id) {
        return res.status(404).json({message: "no Id found"})
      }
      const restaurant = await Restaurant.findByPk(id);
      if(!restaurant) {
        return res.status(404).json({message: "no restaurant found"})
      }
      const categories = restaurant.getCategories()
      categories.forEach(async(category : any) => {
        await removeCategoryFromRestaurant(restaurant.id,category.id)
      });
      const nb_restaurant = await deleteRestaurant(Number(id));
      return res.status(200).json(nb_restaurant);
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
