async function db (){
    const { Sequelize, DataTypes } = require('sequelize');

    const sequelize = new Sequelize({
        database: "TheIncubatorDB",
        port: "5432",
        username: "postgres",
        password: "postgres",
        dialect: "postgres",
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    const ToDo = sequelize.define(
        'ToDo',
        {
            // Model attributes are defined here
            todo_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            description: {
                type: DataTypes.STRING,
                // allowNull defaults to true
            },
        },
        {
            // Other model options go here
        },
    );

    
}

module.exports = db;




