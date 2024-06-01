import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';

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

export default Address;
