import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('mysql://root:root@localhost:3306/mydb');
sequelize.sync().then(() => console.log('Users table has been successfully created, if one doesnt exist')).catch(error => console.log('This error occurred', error));


export default sequelize;