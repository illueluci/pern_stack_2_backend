'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Startup extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    Startup.init({
        id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
        },
        startUpName: DataTypes.STRING,
        founderName: DataTypes.STRING,
        educationOfFounder: DataTypes.STRING,
        roleOfFounder: DataTypes.STRING,
        dateFound: DataTypes.DATE
    }, {
        sequelize,
        modelName: 'Startup',
    });
    return Startup;
};