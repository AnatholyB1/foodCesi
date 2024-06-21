import { Model, DataTypes } from 'sequelize';
import sequelize  from '../db';
import User from './users';

class Dev extends Model {
  public id!: number;
  public user_id!: number;
  public apiKey!: string;
}

Dev.init(
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
    apiKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'devs',
    timestamps: false,
  }
);

Dev.belongsTo(User, { foreignKey: 'user_id' });

export default ;
export const getDev = () => Dev.findAll({
  include: [
    {
      model: User,
      required: true
    }
  ]
});
export const getDevById = (id: number) => Dev.findByPk(id, {
  include: [User]
});

export const createDev = async (Dev: Record<string, any>) => {
  const newDev = await Dev.create(Dev);
  return Dev.findByPk(newDev.id, { include: [User] });
};

export const updateDev = async (id: number, values: Record<string, any>) => {
  await Dev.update(values, { where: { id } });
  return Dev.findByPk(id, { include: [User] });
};

export const deleteDev = (id: number) => Dev.destroy({ where: { id } });

export const getDeliveriesByUserId = (user_id: number) => Dev.findAll({ 
  where: { user_id },
  include: [User]
});



