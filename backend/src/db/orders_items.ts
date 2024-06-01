import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';
import MenuItem from './menu_items'; // Import MenuItem to establish association

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

OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id' });

export default OrderItem;
