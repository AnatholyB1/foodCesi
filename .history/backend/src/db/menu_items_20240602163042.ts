import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db'; // assuming you have a sequelize instance in database.ts
import Restaurant from './restaurants';

class MenuItem extends Model {
  public id!: number;
  public restaurant_id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public category!: string;
  public image_url!: string;
  public available!: boolean;
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
    category_id: {
      type: DataTypes.STRING,
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

MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

export default MenuItem;
export const getMenuItems = () => MenuItem.findAll();
export const getMenuItemById = (id: number) => MenuItem.findByPk(id);
export const getMenuItemsByRestaurantId = (restaurant_id: number) => MenuItem.findAll({ where: { restaurant_id } });
export const createMenuItem = (menuItem: Record<string, any>) => MenuItem.create(menuItem);
export const updateMenuItem = (id: number, values: Record<string, any>) => MenuItem.update(values, { where: { id } });
export const deleteMenuItem = (id: number) => MenuItem.destroy({ where: { id } });
export const deleteMenuItemsByRestaurantId = (restaurant_id: number) => MenuItem.destroy({ where: { restaurant_id } });
