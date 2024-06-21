import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';
import MenuItem from './menu_items'; // Import MenuItem to establish association
import Order from './orders';

class OrderItem extends Model {
  public id!: number;
  public order_id!: number;
  public menu_item_id!: number;
  public quantity!: number;
  public price!: number;
  public total_price!: number;
}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    menu_item_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
  }
);

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id'})

export default OrderItem;
export const getOrderItems = () => OrderItem.findAll();
export const getOrderItemById = (id: number) => OrderItem.findByPk(id);
export const getOrderItemsByOrderId = (order_id: number) => OrderItem.findAll({ where: { order_id } });
export const createOrderItem = (orderItem: Record<string, any>) => OrderItem.create(orderItem);
export const updateOrderItem = (id: number, values: Record<string, any>) => OrderItem.update(values, { where: { id } });
export const updateOrderItemsByOrderId = (order_id: number, values: Record<string, any>) => OrderItem.update(values, { where: { order_id } });
export const deleteOrderItem = (id: number) => OrderItem.destroy({ where: { id } });
export const deleteOrderItemsByOrderId = (order_id: number) => OrderItem.destroy({ where: { order_id } });

