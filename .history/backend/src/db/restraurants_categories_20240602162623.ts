import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../db';
import Restaurant from './restaurants';

class RestaurantCategory extends Model {
  public id!: number;
  public name!: string;
}

RestaurantCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    restaurant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'restaurant_categories',
  }
);

RestaurantCategory.belongsToMany(Restaurant, { through: 'restaurant_id' });

export default RestaurantCategory;
export const getRestaurantCategories = () => RestaurantCategory.findAll();
export const getRestaurantCategoryById = (id: number) => RestaurantCategory.findByPk(id);
export const createRestaurantCategory = (restaurantCategory: Record<string, any>) => RestaurantCategory.create(restaurantCategory);
export const updateRestaurantCategory = (id: number, values: Record<string, any>) => RestaurantCategory.update(values, { where: { id } });
export const deleteRestaurantCategory = (id: number) => RestaurantCategory.destroy({ where: { id } });
export const getRestaurantCategoryByRestaurantId = (id: number) => RestaurantCategory.findAll({ where: { restaurant_id: id } });

