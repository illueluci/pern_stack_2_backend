const { Sequelize, DataTypes } = require('sequelize');
const connection = async () => {
    const sequelize = new Sequelize({
        database: "TheIncubatorDB",
        port: "5432",
        username: "postgres",
        password: "postgres",
        dialect: "postgres",
        logging: false,
    });

    try {
        await sequelize.authenticate();
        console.log('Sequelize Connection has been established successfully.');

        await sequelize.sync();
        console.log("sequelize synced");

        return {
            sequelize: sequelize,
        };
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    
};

module.exports = connection;











