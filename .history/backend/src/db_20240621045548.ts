import { Sequelize } from 'sequelize';

const databaseUrl = process.env.MYSQL_DATABASE_URL || 'user:password@localhost:3306/mydb';

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'mysql'
});

export default sequelize;