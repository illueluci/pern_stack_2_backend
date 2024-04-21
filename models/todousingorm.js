module.exports = (sequelize, DataTypes) => {
    const ToDoUsingOrm = sequelize.define("ToDoUsingOrm", {
        todo_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        }
    });
    return ToDoUsingOrm;
};