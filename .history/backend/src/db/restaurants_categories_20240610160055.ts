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
        'Restaurants',
        key: 'id',
      },
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: 'Categories',
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

Restaurant.belongsToMany(Category, { through: 'restaurant_categories' , foreignKey: 'restaurant_id'});
Category.belongsToMany(Restaurant, { through: 'restaurant_categories',foreignKey: 'category_id' });


export default RestaurantCategory;
export const getRestaurantCategories = () => Category.findAll()
export const getCategoriesByRestaurant = async (restaurantId: number) => {
  // Fetch the restaurant with the given ID
  const restaurant = await Restaurant.findByPk(restaurantId);
  
  // If the restaurant does not exist, log an error and return null
  if (!restaurant) {
    console.error(`Restaurant with ID ${restaurantId} does not exist`);
    return null;
  }

  // Fetch the categories associated with the restaurant
  const categories = await restaurant.getCategories();

  // If the restaurant does not have any associated categories, log a message
  if (categories.length === 0) {
    console.log(`Restaurant with ID ${restaurantId} does not have any associated categories`);
  }

  return categories;
};
export const createRestaurantCategory =  (values : Record<string, any>) => Category.create(values)
export const updateRestaurantCategory =  (id: number, values: Record<string, any>) => Category.update(values, { where: { id } });
export const deleteRestaurantCategory = (id: number) => Category.destroy({ where: { id } });
export const addCategoryToRestaurant = async (restaurant : Restaurant, category : Category) => {
  await RestaurantCategory.create({
    restaurant_id: restaurant.id,
    category_id: category.id
  });
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
