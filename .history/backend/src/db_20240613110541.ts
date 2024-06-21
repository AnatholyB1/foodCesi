import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'mydb',
    'root',
    'root',
     {
       host: process.env.DB_HOST,
       dialect: 'mysql'
     }  
   );
 


export default sequelize;
