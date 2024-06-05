import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';
import Address from './addresses'; // Import Address to establish association
import User from './users'; // Import User to establish association
import Delivery from './delivery';
import Restaurant from './restaurants';

class Order extends Model {
  public id!: number;
  public user_id!: number;
  public restaurant_id!: number;
  public delivery_id!: number;
  public address_id!: number;
  public total_price!: number;
  public status!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    delivery_id:{
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
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
    restaurant_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: false,
  }
);

Order.belongsTo(Address, { foreignKey: 'address_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });
Order.belongsTo(Delivery, { foreignKey: 'delivery_id' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

export default Order;
export const getOrders = () => Order.findAll();
export const getOrderById = (id: number) => Order.findByPk(id);
export const getOrdersByUserId = (user_id: number) => Order.findAll({ where: { user_id } });
export const getOrdersByDeliveryId = (delivery_id: number) => Order.findAll({ where: { delivery_id } });
export const createOrder = (order: Record<string, any>) => Order.create(order);
export const updateOrder = (id: number, values: Record<string, any>) => Order.update(values, { where: { id } });
export const deleteOrder = (id: number) => Order.destroy({ where: { id } });
export const deleteOrdersByUserId = (user_id: number) => Order.destroy({ where: { user_id } });
