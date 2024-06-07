import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'mydb',
    'root',
    'root',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );
 


export default sequelize;
