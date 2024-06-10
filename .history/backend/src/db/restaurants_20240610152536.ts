import { Model, DataTypes } from 'sequelize';
import  sequelize  from '../db';
import Address from './addresses';
import User from './users';
import Category from './category';
import RestaurantCategory from './restaurants_categories';

class Restaurant extends Model {
  public id!: number;
  public user_id!: number;
  public name!: string;
  public address_id!: number;
  public phone_number!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public getCategories!: Function;
  public addCategory! : Function;
  public removeCategory! : Function;
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
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER.UNSIGNED,
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

Restaurant.belongsTo(Address, { foreignKey: 'address_id' });
Restaurant.belongsTo(User, { foreignKey: 'user_id' });
export default Restaurant;
export const createRestaurant = async (restaurant: Record<string, any>) => {
  const newRestaurant = await Restaurant.create(restaurant);
  return Restaurant.findByPk(newRestaurant.id, {
    include: [Address, {
      model: Category,
      as: 'categories',
      through: { attributes: [] }, // This will skip the join table fields
    }]
  });
};

export const updateRestaurant = async (id: number, values: Record<string, any>) => {
  await Restaurant.update(values, { where: { id } });
  return Restaurant.findByPk(id, {
    include: [Address, { model: Category, as: 'categories'}]
  });
};



export const deleteRestaurant = (id: number) => Restaurant.destroy({ where: { id } });
export const deleteRestaurantByUserId = (user_id: number) => Restaurant.destroy({ where: { user_id } });  


export const getRestaurants = () => Restaurant.findAll({
  include: [Address, {
    model: Category,
    as: 'categories',
    through: { attributes: [] }, // This will skip the join table fields
  }]
});

export const getRestaurantById = (id: number) => Restaurant.findByPk(id, {
  include: [Address, { model: Category, as: 'categories'}]
});

export const getRestaurantsByUserId = (user_id: number) => Restaurant.findAll({
  where: { user_id },
  include: [Address, { model: Category, as: 'categories'}]
});

export const getRestaurantsByAddressId = (address_id: number) => Restaurant.findAll({
  where: { address_id },
  include: [Address, { model: Category, as: 'categories'}]
});

export const getRestaurantsByCategory = async (categoryId: number) => {
  const category = await Category.findByPk(categoryId, {
    include: [{
      model: Restaurant,
      include: [Address, { model: Category, as: 'categories'}]
    }]
  });
  return category ? category.getRestaurants() : null;
};