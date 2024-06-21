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
import { getUserById } from "../db/users";
import { getMenuItemsByRestaurantId } from "../db/menu_items";
import { deleteOrderItemsByMenuItemId } from "../db/orders_items";

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
      if(!id) {
        return res.status(404).json({message: "no Id found"}).end()
      }
      const restaurant = await getRestaurantById(Number(id));
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
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
        banner,
        logo,
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
        !banner ||
        !logo ||
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

      const user = await getUserById(Number(user_id));

      if(!user){
        return res.status(404).json({ message: "no user found"})
      }

      

      const new_address = await createAddress(address);

      if (!new_address) {
        return res.status(400).json({ message: "Address not created" }).end();
      }

      const restaurant = {
        user_id,
        banner,
        logo,
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
        await addCategoryToRestaurant(newRestaurant, category);
      });

      const categories_names = await getCategoriesByRestaurant(newRestaurant.id);
      console.log(categories_names)

      const result = {
        ...newRestaurant.toJSON(),
        categories: categories_names,
      }

      return res.status(200).json(result);
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
        banner,
        logo,
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
        banner,
        logo,
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
        ...updatedRestaurant.toJSON(),
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
        return res.status(404).json({message: "no Id found"}).end()
      }
      

      const restaurant = await Restaurant.findByPk(id);
      if(!restaurant) {
        return res.status(404).json({message: "no restaurant found"}).end()
      }


      const nb_restaurant = await deleteRestaurant(Number(id));
      return res.status(200).json(nb_restaurant).end();
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
      await deleteRestaurantByUserId(Number(user_id));
      return res.status(200).json({ message: 'Restaurants deleted successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);