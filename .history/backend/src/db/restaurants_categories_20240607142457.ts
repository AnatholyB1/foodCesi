import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import Restaurant from "./restaurants";
import Category from "./category"

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

Restaurant.belongsToMany(Category, { through: RestaurantCategory });
Category.belongsToMany(Restaurant, { through: RestaurantCategory });


export default RestaurantCategory;
export const getRestaurantCategories = async (restaurantId: number) => {
  const restaurant = await Restaurant.findByPk(restaurantId);
  return restaurant ? restaurant.getCategories() : null;
};
export const createRestaurantCategory =  (values : Record<string, any>) => Category.create(values)
export const updateRestaurantCategory =  (id: number, values: Record<string, any>) => Category.update(values, { where: { id } });
export const deleteRestaurantCategory = (id: number) => Category.destroy({ where: { id } });
