import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';


class User extends Model {
    public id!: string;
    public username!: string;
    public email!: string;
    public password!: string;
    public salt!: string;
    public sessionToken!: string;
    // Include any other properties here
}


User.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    salt: {
      type: new DataTypes.STRING(1000),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(500),
      allowNull: false,
    },
    sessionToken: {
      type: new DataTypes.STRING(500),
      allowNull: false,
    },
  }, {
    tableName: 'users',
    sequelize, // this is the sequelize instance
  });


export const getUsers = () => User.findAll();
export const getUserByEmail = (email: string) => User.findOne({ where: { email } });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ where: { sessionToken } });
export const getUserById = (id : string) => User.findByPk(id);
export const createUser = (values : Record<string, any>) =>  User.create(values);
export const deleteUserById = (id : string) => User.destroy({ where: { id } });
export const updateUserById = (id: string, values: Record<string, any>) => User.update(values, { where: { id } });