import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL || 'user:password@localhost:3306/mydb';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql'
});

export default sequelize;