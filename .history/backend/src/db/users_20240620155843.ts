import { DataTypes, Model } from "sequelize";
import sequelize from "../db";
import {random} from "../helpers";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public type!: string;
  public admin!: boolean;
  public sponsor_code!: string;
  public sponsor!: boolean;
  public refreshToken!: string;
  public active!: boolean;
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
    sponsor_code: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      defaultValue: random(),
    },
    sponsor :  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    active: {
      type: new DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
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
export const getUsers = () => User.findAll({where: {active:true}});
export const getUserByEmail = (email: string) =>
  User.findOne({ where: { email, active:true} });
export const getUserByRefreshToken = (refreshToken: string) =>
  User.findOne({ where: { refreshToken, active:true } });
export const getUserById = (id: number) => User.findByPk(id);
export const createUser = (values: Record<string, any>) => User.create(values);
export const deleteUserById = (id: string) => User.update({ active: false }, { where: { id: id } }) //.destroy({ where: { id } });
export const deleteAllUsers = () => User.destroy({ where: {} });
export const updateUserById = async (id: number, values: Record<string, any>) => {
  await User.update(values, { where: { id } });
  return User.findOne({ where: { id } });
};
export const getUserByUserType = (userType: string) =>
  User.findAll({ where: { type: userType, active:true } });
export const getUserBySponsorCode = (sponsorCode: string) =>
  User.findOne({ where: { sponsor_code: sponsorCode, active:true } });  

