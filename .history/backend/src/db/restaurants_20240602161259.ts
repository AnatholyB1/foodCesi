import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../db';

class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public address!: string;
  public city!: string;
  public state!: string;
  public zip_code!: string;
  public country!: string;
  public phone_number!: string;
  public created_at!: Date;
  public updated_at!: Date;
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
    address: {
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
  },
  {
    sequelize,
    tableName: 'restaurants',
    timestamps: false,
  }
);

export default Restaurant;
export const getRestaurants = () => Restaurant.findAll(); 
export const getRestaurantById = (id: number) => Restaurant.findByPk(id);
export const createRestaurant = (restaurant: Record<string, any>) => Restaurant.create(restaurant);
export const updateRestaurant = (id: number, values: Record<string, any>) => Restaurant.update(values, { where: { id } });
export const deleteRestaurant = (id: number) => Restaurant.destroy({ where: { id } });
export const getRestaurantsByCity = (city: string) => Restaurant.findAll({ where: { city } });
export const getRestaurantsByState = (state: string) => Restaurant.findAll({ where: { state } });
export const getRestaurantsByZipCode = (zip_code: string) => Restaurant.findAll({ where: { zip_code } });
export const getRestaurantsByCountry = (country: string) => Restaurant.findAll({ where: { country } });
export const getRestaurantsByPhoneNumber = (phone_number: string) => Restaurant.findAll({ where: { phone_number } });
export const deleteRestaurantsByCity = (city: string) => Restaurant.destroy({ where: { city } });
export const deleteRestaurantsByState = (state: string) => Restaurant.destroy({ where: { state } });
export const deleteRestaurantsByZipCode = (zip_code: string) => Restaurant.destroy({ where: { zip_code } });
export const deleteRestaurantsByCountry = (country: string) => Restaurant.destroy({ where: { country } });
export const deleteRestaurantsByPhoneNumber = (phone_number: string) => Restaurant.destroy({ where: { phone_number } });
export const getRestaurantsByCityAndState = (city: string, state: string) => Restaurant.findAll({ where: { city, state } });
export const getRestaurantsByCityAndZipCode = (city: string, zip_code: string) => Restaurant.findAll({ where: { city, zip_code } });
export const getRestaurantsByCityAndCountry = (city: string, country: string) => Restaurant.findAll({ where: { city, country } });
export const getRestaurantsByCityAndPhoneNumber = (city: string, phone_number: string) => Restaurant.findAll({ where: { city, phone_number } });
export const getRestaurantsByStateAndZipCode = (state: string, zip_code: string) => Restaurant.findAll({ where: { state, zip_code } });
export const getRestaurantsByStateAndCountry = (state: string, country: string) => Restaurant.findAll({ where: { state, country } });
export const getRestaurantsByStateAndPhoneNumber = (state: string, phone_number: string) => Restaurant.findAll({ where: { state, phone_number } });
export const getRestaurantsByZipCodeAndCountry = (zip_code: string, country: string) => Restaurant.findAll({ where: { zip_code, country } });
export const getRestaurantsByZipCodeAndPhoneNumber = (zip_code: string, phone_number: string) => Restaurant.findAll({ where: { zip_code, phone_number } });
export const getRestaurantsByCountryAndPhoneNumber = (country: string, phone_number: string) => Restaurant.findAll({ where: { country, phone_number } });
export const deleteRestaurantsByCityAndState = (city: string, state: string) => Restaurant.destroy({ where: { city, state } });
export const deleteRestaurantsByCityAndZipCode = (city: string, zip_code: string) => Restaurant.destroy({ where: { city, zip_code } });
export const deleteRestaurantsByCityAndCountry = (city: string, country: string) => Restaurant.destroy({ where: { city, country } });
export const deleteRestaurantsByCityAndPhoneNumber = (city: string, phone_number: string) => Restaurant.destroy({ where: { city, phone_number } });
export const deleteRestaurantsByStateAndZipCode = (state: string, zip_code: string) => Restaurant.destroy({ where: { state, zip_code } });
export const deleteRestaurantsByStateAndCountry = (state: string, country: string) => Restaurant.destroy({ where: { state, country } });
export const deleteRestaurantsByStateAndPhoneNumber = (state: string, phone_number: string) => Restaurant.destroy({ where: { state, phone_number } });
export const deleteRestaurantsByZipCodeAndCountry = (zip_code: string, country: string) => Restaurant.destroy({ where: { zip_code, country } });
export const deleteRestaurantsByZipCodeAndPhoneNumber = (zip_code: string, phone_number: string) => Restaurant.destroy({ where: { zip_code, phone_number } });
export const deleteRestaurantsByCountryAndPhoneNumber = (country: string, phone_number: string) => Restaurant.destroy({ where: { country, phone_number } });
export const getRestaurantsByCityAndStateAndZipCode = (city: string, state: string, zip_code: string) => Restaurant.findAll({ where: { city, state, zip_code } });
export const getRestaurantsByCityAndStateAndCountry = (city: string, state: string, country: string) => Restaurant.findAll({ where: { city, state, country } });
export const getRestaurantsByCityAndStateAndPhoneNumber = (city: string, state: string, phone_number: string) => Restaurant.findAll({ where: { city, state, phone_number } });
export const getRestaurantsByCityAndZipCodeAndCountry = (city: string, zip_code: string, country: string) => Restaurant.findAll({ where: { city, zip_code, country } });
export const getRestaurantsByCityAndZipCodeAndPhoneNumber = (city: string, zip_code: string, phone_number: string) => Restaurant.findAll({ where: { city, zip_code, phone_number } });
export const getRestaurantsByCityAndCountryAndPhoneNumber = (city: string, country: string, phone_number: string) => Restaurant.findAll({ where: { city, country, phone_number } });
export const getRestaurantsByStateAndZipCodeAndCountry = (state: string, zip_code: string, country: string) => Restaurant.findAll({ where: { state, zip_code, country } });
export const getRestaurantsByStateAndZipCodeAndPhoneNumber = (state: string, zip_code: string, phone_number: string) => Restaurant.findAll({ where: { state, zip_code, phone_number } });
export const getRestaurantsByStateAndCountryAndPhoneNumber = (state: string, country: string, phone_number: string) => Restaurant.findAll({ where: { state, country, phone_number } });
export const getRestaurantsByZipCodeAndCountryAndPhoneNumber = (zip_code: string, country: string, phone_number: string) => Restaurant.findAll({ where: { zip_code, country, phone_number } });
export const deleteRestaurantsByCityAndStateAndZipCode = (city: string, state: string, zip_code: string) => Restaurant.destroy({ where: { city, state, zip_code } });
export const deleteRestaurantsByCityAndStateAndCountry = (city: string, state: string, country: string) => Restaurant.destroy({ where: { city, state, country } });
export const deleteRestaurantsByCityAndStateAndPhoneNumber = (city: string, state: string, phone_number: string) => Restaurant.destroy({ where: { city, state, phone_number } });
export const deleteRestaurantsByCityAndZipCodeAndCountry = (city: string, zip_code: string, country: string) => Restaurant.destroy({ where: { city, zip_code, country } });
export const deleteRestaurantsByCityAndZipCodeAndPhoneNumber = (city: string, zip_code: string, phone_number: string) => Restaurant.destroy({ where: { city, zip_code, phone_number } });
export const deleteRestaurantsByCityAndCountryAndPhoneNumber = (city: string, country: string, phone_number: string) => Restaurant.destroy({ where: { city, country, phone_number } });
export const deleteRestaurantsByStateAndZipCodeAndCountry = (state: string, zip_code: string, country: string) => Restaurant.destroy({ where: { state, zip_code, country } });
export const deleteRestaurantsByStateAndZipCodeAndPhoneNumber = (state: string, zip_code: string, phone_number: string) => Restaurant.destroy({ where: { state, zip_code, phone_number } });
export const deleteRestaurantsByStateAndCountryAndPhoneNumber = (state: string, country: string, phone_number: string) => Restaurant.destroy({ where: { state, country, phone_number } });
export const deleteRestaurantsByZipCodeAndCountryAndPhoneNumber = (zip_code: string, country: string, phone_number: string) => Restaurant.destroy({ where: { zip_code, country, phone_number } });
export const getRestaurantsByCityAndStateAndZipCodeAndCountry = (city: string, state: string, zip_code: string, country: string) => Restaurant.findAll({ where: { city, state, zip_code, country } });
export const getRestaurantsByCityAndStateAndZipCodeAndPhoneNumber = (city: string, state: string, zip_code: string, phone_number: string) => Restaurant.findAll({ where: { city, state, zip_code, phone_number } });
export const getRestaurantsByCityAndStateAndCountryAndPhoneNumber = (city: string, state: string, country: string, phone_number: string) => Restaurant.findAll({ where: { city, state, country, phone_number } });
export const getRestaurantsByCityAndZipCodeAndCountryAndPhoneNumber = (city: string, zip_code: string, country: string, phone_number: string) => Restaurant.findAll({ where: { city, zip_code, country, phone_number } });
export const getRestaurantsByStateAndZipCodeAndCountryAndPhoneNumber = (state: string, zip_code: string, country: string, phone_number: string) => Restaurant.findAll({ where: { state, zip_code, country, phone_number } });
export const getRestaurantsByCityAndStateAndZipCodeAndCountryAndPhoneNumber = (city: string, state: string, zip_code: string, country: string, phone_number: string) => Restaurant.findAll({ where: { city, state, zip_code, country, phone_number } });
export const deleteRestaurantsByCityAndStateAndZipCodeAndCountry = (city: string, state: string, zip_code: string, country: string) => Restaurant.destroy({ where: { city, state, zip_code, country } });
export const deleteRestaurantsByCityAndStateAndZipCodeAndPhoneNumber = (city: string, state: string, zip_code: string, phone_number: string) => Restaurant.destroy({ where: { city, state, zip_code, phone_number } });
export const deleteRestaurantsByCityAndStateAndCountryAndPhoneNumber = (city: string, state: string, country: string, phone_number: string) => Restaurant.destroy({ where: { city, state, country, phone_number } });
export const deleteRestaurantsByCityAndZipCodeAndCountryAndPhoneNumber = (city: string, zip_code: string, country: string, phone_number: string) => Restaurant.destroy({ where: { city, zip_code, country, phone_number } });
export const deleteRestaurantsByStateAndZipCodeAndCountryAndPhoneNumber = (state: string, zip_code: string, country: string, phone_number: string) => Restaurant.destroy({ where: { state, zip_code, country, phone_number } });

