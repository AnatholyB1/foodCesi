import { Sequelize } from 'sequelize';


const sequelize = new Sequelize(
    'mydb',
    'root',
    'root',
     {
       host: process.env.DB_HOST || 'host.docker.internal',
       port: 3306,
       dialect: 'mysql'
     }  
   );
 


export default sequelize;
