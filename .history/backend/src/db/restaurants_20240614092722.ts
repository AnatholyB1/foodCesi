import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import Address from "./addresses";
import User from "./users";
import Category from "./category";

class Restaurant extends Model {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public address_id!: number;
  public phone_number!: string;
  public banner!: string;
  public logo!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public getCategories!: Function;
  public addCategory!: Function;
  public removeCategory!: Function;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    banner: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "restaurants",
    modelName: "Restaurant",
    timestamps: false,
  }
);


Restaurant.belongsTo(Address, { foreignKey: "address_id" });
Restaurant.belongsTo(User, { foreignKey: "user_id" });
export default Restaurant;
export const createRestaurant = async (restaurant: Record<string, any>) => {
  const newRestaurant = await Restaurant.create(restaurant);
  return Restaurant.findByPk(newRestaurant.id, {
    include: [
      Address,
      {
        model: Category,
        as: "categories",
        through: { attributes: [] }, // This will skip the join table fields
      },
    ],
  });
};

export const updateRestaurant = async (
  id: number,
  values: Record<string, any>
) => {
  await Restaurant.update(values, { where: { id } });
  return Restaurant.findByPk(id, {
    include: [Address, { model: Category, as: "categories" }],
  });
};

export const deleteRestaurant = (id: number) =>
   Restaurant.update({ active: false }, { where: { id: id } });



export const deleteRestaurantByUserId = async (user_id: number) => {
  const userRestaurants = await Restaurant.findAll({
    where: { user_id: Number(user_id) },
  });

  for (let restaurant of userRestaurants) {
    // Fetch the categories associated with the restaurant
    const categories = await restaurant.getCategories();

    // Remove the association between the categories and the restaurant
    await restaurant.removeCategory(categories);

    // Now you can safely "delete" the restaurant by setting active to false
    await restaurant.update({ active: false });
  }
};

export const getRestaurants = () =>
  Restaurant.findAll({
    where: { active: true },
    include: [Address, { model: Category, as: "categories" }],
  });

  export const getRestaurantById = (id: number) =>
    Restaurant.findByPk(id, {
      include: [Address, { model: Category, as: "categories" }],
    });

export const getRestaurantsByUserId = (user_id: number) =>
  Restaurant.findAll({
    where: { user_id, active: true },
    include: [Address, { model: Category, as: "categories" }],
  });

export const getRestaurantsByAddressId = (address_id: number) =>
  Restaurant.findAll({
    where: { address_id, active: true },
    include: [Address, { model: Category, as: "categories" }],
  });

export const getRestaurantsByCategory = async (categoryId: number) => {
  const category = await Category.findByPk(categoryId, {
    include: [
      {
        model: Restaurant,
        where: { active: true },
        include: [Address, { model: Category, as: "categories" }],
      },
    ],
  });
  return category ? category.getRestaurants() : null;
};