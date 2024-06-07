import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../db';
import Address from './addresses';

class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public phone_number!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public categories!: Array<string>;
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
    address_id: {
      type: DataTypes.STRING,
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
      type: DataTypes.ARRAY(DataTypes.STRING),
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
export default Restaurant;
export const getRestaurants = () => Restaurant.findAll(); 
export const getRestaurantById = (id: number) => Restaurant.findByPk(id);
export const createRestaurant = (restaurant: Record<string, any>) => Restaurant.create(restaurant);
export const updateRestaurant = (id: number, values: Record<string, any>) => Restaurant.update(values, { where: { id } });
export const deleteRestaurant = (id: number) => Restaurant.destroy({ where: { id } });
