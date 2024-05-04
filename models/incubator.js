'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Incubator extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(sequelize.models.Startup, { foreignKey: 'IncubatorId' });
            sequelize.models.Startup.belongsTo(this);
        }
    }
    Incubator.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        code: DataTypes.STRING,
        location: DataTypes.STRING,
        level: DataTypes.STRING,
        valuation: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Incubator',
    });
    return Incubator;
};