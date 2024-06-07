import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';
import Address from './addresses';
import User from './users';

class Delivery extends Model {
  public id!: number;
  public user_id!: number;
  public address_id!: number;
  public available!: boolean;
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
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'Deliveries',
    timestamps: false,
  }
);

Delivery.belongsTo(Address, { foreignKey: 'address_id' });
Delivery.belongsTo(User, { foreignKey: 'user_id' });

export default Delivery;
export const getDeliveries = () => Delivery.findAll({
  include: [
    {
      model: User,
      required: true
    },
    {
      model: Address,
      required: true
    }
  ]
});
export const getDeliveryById = (id: number) => Delivery.findByPk(id, {
  include: [User, Address]
});

export const createDelivery = async (delivery: Record<string, any>) => {
  const newDelivery = await Delivery.create(delivery);
  return Delivery.findByPk(newDelivery.id, { include: [User, Address] });
};

export const updateDelivery = async (id: number, values: Record<string, any>) => {
  await Delivery.update(values, { where: { id } });
  return Delivery.findByPk(id, { include: [User, Address] });
};

export const deleteDelivery = (id: number) => Delivery.destroy({ where: { id } });

export const getDeliveriesByUserId = (user_id: number) => Delivery.findAll({ 
  where: { user_id },
  include: [User, Address]
});

export const getDeliveriesByAddressId = (address_id: number) => Delivery.findAll({ 
  where: { address_id },
  include: [User, Address]
});

export const getDeliveryByUserIdAndAddressId = (user_id: number, address_id: number) => Delivery.findAll({ 
  where: { user_id, address_id },
  include: [User, Address]
});

export const getAvailableDelivery = () => Delivery.findAll({ 
  where: { available: true },
  include: [User, Address]
});


