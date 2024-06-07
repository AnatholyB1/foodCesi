import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../db';
import Address from './addresses';
import User from './users';
import RestaurantCategory from './restaurants_categories';

class Restaurant extends Model {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public address_id!: number;
  public phone_number!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public categories!: number[];
}

Restaurant.init(
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
    categories: {
      type: DataTypes.ARRAY(DataTypes.NUMBER),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'restaurants',
    timestamps: false,
  }
);

Restaurant.belongsTo(Address, { foreignKey: 'address_id' });
Restaurant.belongsTo(User, { foreignKey: 'user_id' });
export default Restaurant;
export const getRestaurants = () => Restaurant.findAll(); 
export const getRestaurantById = (id: number) => Restaurant.findByPk(id);
export const getRestaurantsByUserId = (user_id: number) => Restaurant.findAll({ where: { user_id } });
export const getRestaurantsByAddressId = (address_id: number) => Restaurant.findAll({ where: { address_id } });
export const createRestaurant = (restaurant: Record<string, any>) => Restaurant.create(restaurant);
export const updateRestaurant = (id: number, values: Record<string, any>) => Restaurant.update(values, { where: { id } });
export const deleteRestaurant = (id: number) => Restaurant.destroy({ where: { id } });
export const deleteRestaurantByUserId = (user_id: number) => Restaurant.destroy({ where: { user_id } });  
