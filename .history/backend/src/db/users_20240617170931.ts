import { DataTypes, Model } from "sequelize";
import sequelize from "../db";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public type!: string;
  public refreshToken!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // Include any other properties here
}

User.init(
  {
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
    type: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    refreshToken: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    createdAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize, // this is the sequelize instance
  }
);


export default User;
export const getUsers = () => User;
export const getUserByEmail = (email: string) =>
  User.findOne({ where: { email } });
export const getUserByRefreshToken = (refreshToken: string) =>
  User.findOne({ where: { refreshToken } });
export const getUserById = (id: number) => User.findByPk(id);
export const createUser = (values: Record<string, any>) => User.create(values);
export const deleteUserById = (id: string) => User.destroy({ where: { id } });
export const deleteAllUsers = () => User.destroy({ where: {} });
export const updateUserById = (id: number, values: Record<string, any>) =>
  User.update(values, { where: { id } });
export const getUserByUserType = (userType: string) =>
  User.findAll({ where: { type: userType } });
