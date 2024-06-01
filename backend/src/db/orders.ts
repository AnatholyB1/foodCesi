import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';
import Address from './addresses'; // Import Address to establish association

class Order extends Model {
  public id!: number;
  public user_id!: number;
  public address_id!: number;
  public total_price!: number;
  public status!: string;
  public created_at!: Date;
  public updated_at!: Date;
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
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: false,
  }
);

Order.belongsTo(Address, { foreignKey: 'address_id' });

export default Order;
