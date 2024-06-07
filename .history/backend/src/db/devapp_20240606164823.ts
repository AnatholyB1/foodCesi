import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db'; // assuming you have a sequelize instance in database.ts
import User from './users';

class DevApp extends Model {
  public id!: number;
  public name!: string;
  public user_id!: number;
  public passkey!: string;
  public salt!: string;
  public description!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

DevApp.init(
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
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    passkey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
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
    tableName: 'devApps',
    timestamps: false,
  }
);


DevApp.belongsTo(User, { foreignKey: 'user_id' });
export default DevApp;

export const getDevApp = () => DevApp.findAll();
export const getDevAppById = (id: number) => DevApp.findByPk(id);
export const getDevAppByUserId = (user_id: number) => DevApp.findAll({where: {user_id: user_id}});
export const getDevAppByName = (name: string) => DevApp.findAll({where: {name: name}});
export const updateDevApp = (id: number, name: string, user_id: number, passkey: string, salt: string, description: string) => DevApp.update({name: name, user_id: user_id, passkey: passkey, salt: salt, description: description}, {where: {id: id}});
export const deleteDevApp = (id: number) => DevApp.destroy({where: {id: id}});