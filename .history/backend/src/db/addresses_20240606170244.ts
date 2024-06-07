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
export const getAddresses = () => Address.findAll({
  include: [User]
});

export const getAddressById = (id: number) => Address.findByPk(id, {
  include: [User]
});

export const getAddressesByUserId = (user_id: number) => Address.findAll({ 
  where: { user_id },
  include: [User]
});

export const createAddress = async (address: Record<string, any>) => {
  const newAddress = await Address.create(address);
  return Address.findByPk(newAddress.id, { include: [User] });
};

export const updateAddress = async (id: number, values: Record<string, any>) => {
  await Address.update(values, { where: { id } });
  return Address.findByPk(id, { include: [User] });
};

export const deleteAddress = (id: number) => Address.destroy({ where: { id } });

export const deleteAddressesByUserId = (user_id: number) => Address.destroy({ where: { user_id } });

export const getUserByCity = (city: string) => Address.findAll({
  where: { city },
  include: [User]
});

export const getUserByState = (state: string) => Address.findAll({
  where: { state },
  include: [User]
});

export const getUserByCountry = (country: string) => Address.findAll({
  where: { country },
  include: [User]
});

export const getUserByZipCode = (zip_code: string) => Address.findAll({
  where: { zip_code },
  include: [User]
});

export const getUserByStreet = (street: string) => Address.findAll({
  where: { street },
  include: [User]
});

sequelize.sync().then(() => {
  console.log('Book table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});