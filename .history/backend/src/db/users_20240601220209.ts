import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize('mysql://root:rootpassword@localhost:3306/mydb');

class User extends Model {}

interface UserInstance {
    id: string;
    username: string;
    email: string;
    password: string;
    salt: string;
    sessionToken: string;
    // Include any other properties here
  }
  
User.init({
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  salt: { type: DataTypes.STRING, allowNull: false },
  sessionToken: { type: DataTypes.STRING, allowNull: false },
}, {
  sequelize,
  modelName: 'User',
});

export const getUsers = () => User.findAll();
export const getUserByEmail = (email: string) => User.findOne({ where: { email } });
export const getUserBySessionToken = (sessionToken: string) => User.findOne({ where: { sessionToken } });
export const getUserById = (id : string) => User.findByPk(id);
export const createUser = (values : Record<string, any>) => User.create(values);
export const deleteUserById = (id : string) => User.destroy({ where: { id } });
export const updateUserById = (id: string, values: Record<string, any>) => User.update(values, { where: { id } });