import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db'; // assuming you have a sequelize instance in database.ts
import Restaurant from './restaurants';
import Category from './category';

class MenuCategory extends Model {
  public restaurant_id!: number;
  public category_id!: number;
}

MenuCategory.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    menu_item_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model:'Restaurants',
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



class MenuItem extends Model {
  public id!: number;
  public restaurant_id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public image_url!: string;
  public available!: boolean;
  public Restaurant?: Restaurant | undefined;
  public addCategory!: Function
}

MenuItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'menu_items',
  }
);

MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurant_id', as: 'Restaurant' });
MenuItem.belongsToMany(Category, { through: MenuCategory, foreignKey: 'menu_item_id'});
Category.belongsToMany(MenuItem, { through: MenuCategory, foreignKey: 'category_id'});


export default MenuItem;
export const getMenuItems = () => MenuItem.findAll();
export const getMenuItemById = (id: number) => MenuItem.findByPk(id);
export const getMenuItemsByRestaurantId = (restaurant_id: number) => MenuItem.findAll({ where: { restaurant_id } });
export const getMenuItemsByCategoryId = (category_id: number) => MenuItem.findAll({ where: { category_id } });
export const createMenuItem = (menuItem: Record<string, any>) => MenuItem.create(menuItem);
export const updateMenuItem = (id: number, values: Record<string, any>) => MenuItem.update(values, { where: { id } });
export const deleteMenuItem = (id: number) => MenuItem.destroy({ where: { id } });
export const deleteMenuItemsByRestaurantId = (restaurant_id: number) => MenuItem.destroy({ where: { restaurant_id } });
export const getRestaurantsByItemId = (item_id: number) => 
  MenuItem.findByPk(item_id, {
    include: [{
      model: Restaurant,
      as: 'Restaurant',
      required: true
    }]
  }).then((item) => item?.Restaurant);