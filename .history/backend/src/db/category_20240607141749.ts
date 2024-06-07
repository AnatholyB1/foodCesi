import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

class Category extends Model {
    public id!: number;
    public name!: string;
    public getRestaurants! :Function
  }
  
  Category.init(
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
    },
    {
      tableName: 'categories',
      sequelize,
    }
  );


  export default Category;