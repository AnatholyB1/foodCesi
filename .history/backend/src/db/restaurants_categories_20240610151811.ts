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

Restaurant.belongsToMany(Category, { through: RestaurantCategory , as: 'categories'});
Category.belongsToMany(Restaurant, { through: RestaurantCategory, as: 'restaurants' });


export default RestaurantCategory;
export const getRestaurantCategories = () => Category.findAll()
export const getCategoriesByRestaurant = async (restaurantId: number) => {
  const restaurant = await Restaurant.findByPk(restaurantId);
  return restaurant ? await restaurant.getCategories() : null;
};
export const createRestaurantCategory =  (values : Record<string, any>) => Category.create(values)
export const updateRestaurantCategory =  (id: number, values: Record<string, any>) => Category.update(values, { where: { id } });
export const deleteRestaurantCategory = (id: number) => Category.destroy({ where: { id } });
export const addCategoryToRestaurant = async (restaurant : Restaurant, category : Category) => {
  await restaurant.addCategory(category);
};

export const removeCategoryFromRestaurant = async (
  restaurantId: number,
  categoryId: number
) => {
  const restaurant = await Restaurant.findByPk(restaurantId);
  const category = await Category.findByPk(categoryId);

  if (restaurant && category) {
    return restaurant.removeCategory(category);
  }

  return null;
};
