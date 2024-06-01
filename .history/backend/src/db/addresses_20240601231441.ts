import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Address extends Model {
    public id!: string;
    public street!: string;
    public city!: string;
    public state!: string;
    public zip!: string;
    public userId!: string;
    public userType!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // Include any other properties here
}

Address.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    street: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    city: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    state: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    zip: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    userId: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    userType: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    createdAt: {
        type: new DataTypes.DATE(),
        allowNull: false,
    },
    updatedAt: {
        type: new DataTypes.DATE(),
        allowNull: false,
    },
}, {
    tableName: 'addresses',
    sequelize, // this is the sequelize instance
});