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
  getCategoriesByRestaurant,
} from "../db/restaurants_categories";
import Address, { createAddress, getAddressById, updateAddress } from "../db/addresses";
import { withLogging } from "../helpers";
import Category from "../db/category";
import { getUserById } from "../db/users";

export const getAllRestaurants = withLogging(
  "getAllRestaurants",
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

      const { count: total, rows: restaurants } =
        await Restaurant.findAndCountAll({
          where: {
            ...filter,
            active: true,
          },
          order: sort,
          offset: range[0],
          limit: range[1] - range[0] + 1,
          include: [Address, { model: Category, as: "categories" }],
        });

      res.setHeader("Content-Range", `restaurants ${range[0]}-${range[1]}/${total}`);
      res.setHeader("Access-Control-Expose-Headers", "Content-Range");

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
      if (!id) {
        return res.status(404).json({ message: "no Id found" }).end();
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

      if (!user) {
        return res.status(404).json({ message: "no user found" });
      }

      if (user.type !== "restaurant") {
        return res
          .status(400)
          .json({ message: "User is not a restaurant" })
          .end();
      }

      const already_restaurant = await getRestaurantsByUserId(Number(user_id));
      if (already_restaurant.length > 0) {
        return res
          .status(400)
          .json({ message: "User already has a restaurant" })
          .end();
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
        return res
          .status(400)
          .json({ message: "Restaurant not created" })
          .end();
      }

      categories.forEach(async (id: string) => {
        const category_id = Number(id);
        const category = await Category.findByPk(category_id);

        if (!category) {
          return res.status(400).json({ message: "Category not found" }).end();
        }
        await addCategoryToRestaurant(newRestaurant, category);
      });

      const categories_names = await getCategoriesByRestaurant(
        newRestaurant.id
      );
      console.log(categories_names);

      const result = {
        ...newRestaurant.toJSON(),
        categories: categories_names,
      };

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


      if(!categories)
      {
        return res.status(200).json(updatedRestaurant).end();
      }
      const current_categories = updatedRestaurant.getCategories()

      // Find the categories to add and the categories to remove
      const categoriesToAdd = categories.filter(
        (category: any) => !current_categories.includes(category)
      );
      const categoriesToRemove = current_categories.filter(
        (category: any) => !categories.includes(category)
      );


      // Add the new categories
      for (const categoryName of categoriesToAdd) {
        const category = await Category.findOne({
          where: { name: categoryName },
        });
        if (category) {
          await updatedRestaurant.addCategory(category);
        }
      }

      // Remove the old categories
      for (const categoryName of categoriesToRemove) {
        const category = await Category.findOne({
          where: { name: categoryName },
        });
        if (category) {
          await updatedRestaurant.removeCategory(category);
        }
      }
      updatedRestaurant.save();

      return res.status(200).json(updatedRestaurant);
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
      if (!id) {
        return res.status(404).json({ message: "no Id found" }).end();
      }

      const restaurant = await Restaurant.findByPk(id);
      if (!restaurant) {
        return res.status(404).json({ message: "no restaurant found" }).end();
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
      return res
        .status(200)
        .json({ message: "Restaurants deleted successfully" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
);
