import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';
import Address from './addresses';
import User from './users';

class Delivery extends Model {
  public id!: number;
  public user_id!: number;
  public address_id!: number;
}

Delivery.init(
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
  },
  {
    sequelize,
    tableName: 'Deliverys',
    timestamps: false,
  }
);

Delivery.belongsTo(Address, { foreignKey: 'address_id' });
Delivery.belongsTo(User, { foreignKey: 'user_id' });

export default Delivery;
export const getDeliveries = () => Delivery.findAll();
export const getDeliveryById = (id: number) => Delivery.findByPk(id);
export const createDelivery = (delivery: Record<string, any>) => Delivery.create(delivery);
export const updateDelivery = (id: number, values: Record<string, any>) => Delivery.update(values, { where: { id } });
export const deleteDelivery = (id: number) => Delivery.destroy({ where: { id } });
export const getDeliveriesByUserId = (user_id: number) => Delivery.findAll({ where: { user_id } });
export const getDeliveriesByAddressId = (address_id: number) => Delivery.findAll({ where: { address_id } });
