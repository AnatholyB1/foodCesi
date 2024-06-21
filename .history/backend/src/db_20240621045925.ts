import { Sequelize } from 'sequelize';

const databaseUrl = 'mysql://user:password@localhost:3306/mydb'

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql'
});

export default sequelize;