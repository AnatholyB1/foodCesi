import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';
import User from './users';

class Address extends Model {
  public id!: number;
  public user_id!: number;
  public street!: string;
  public city!: string;
  public state!: string;
  public zip_code!: string;
  public country!: string;
}

Address.init(
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
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'addresses',
    timestamps: false,
  }
);

Address.belongsTo(User, { foreignKey: 'user_id' });

export default Address;
export const getAddresses = () => Address.findAll();
export const getAddressById = (id: number) => Address.findByPk(id);
export const getAddressesByUserId = (user_id: number) => Address.findAll({ where: { user_id } });
export const createAddress = (address: Record<string, any>) => Address.create(address);
export const updateAddress = (id: number, values: Record<string, any>) => Address.update(values, { where: { id } });
export const deleteAddress = (id: number) => Address.destroy({ where: { id } });
export const deleteAddressesByUserId = (user_id: number) => Address.destroy({ where: { user_id } });
