import { Model, DataTypes } from "sequelize";
import sequelize from "../db";

class RestaurantCategory extends Model {
  public restaurant_id!: number;
  public category_id!: number;
}

RestaurantCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'restaurants',
        key: 'id',
      },
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'categories',
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "restaurant_categories",
  }
);

export default RestaurantCategory;
export const getRestaurantCategories = () => RestaurantCategory.findAll();
export const getRestaurantCategoryById = (id: number) =>
  RestaurantCategory.findByPk(id);
export const createRestaurantCategory = (
  restaurantCategory: Record<string, any>
) => RestaurantCategory.create(restaurantCategory);
export const updateRestaurantCategory = (
  id: number,
  values: Record<string, any>
) => RestaurantCategory.update(values, { where: { id } });
export const deleteRestaurantCategory = (id: number) =>
  RestaurantCategory.destroy({ where: { id } });
