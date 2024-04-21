'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ToDoUsingOrm extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
        // define association here
        }
    }
    ToDoUsingOrm.init({
        todo_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
        },
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ToDoUsingOrm',
    });
    return ToDoUsingOrm;
};