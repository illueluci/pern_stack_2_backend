const express = require("express");
const router = express.Router();

function ToDoController(sequelize){
    //create a todo
    router.post("/", async (req, res) => {
        let test = "";
        try {
            // const {description} = req.body;

            // const query = "insert into todo (description) values($1) returning *";
            // const sqlParams = [description];

            // const newToDo = await pool.query(query, sqlParams);

            const description = req.body.description;
            const objToBeSaved = sequelize.models.ToDoUsingOrm.build({
                description: description
            });

            await objToBeSaved.save();
            res.json(objToBeSaved);
        } catch (err) {
            console.error(err.message);
        }
    });

    //get all todos
    router.get("/", async (req, res) => {
        let test = "";
        try {
            // const query = "select * from todo";
            // const allToDos = await pool.query(query);

            // res.json(allToDos.rows);
            let test1 = sequelize.models;
            let test2 = sequelize.models.ToDoUsingOrm;
            const toDos = await sequelize.models.ToDoUsingOrm.findAll();
            res.json(toDos);

        } catch (err) {
            console.error(err.message);
        }
    });

    //get a todo
    router.get("/:id", async (req, res) => {
        let test = "";
        try {
            // const { id } = req.params;
            // const todo = await pool.query("select * from todo where todo_id = $1", [id]);
            // res.json(todo.rows[0]);

            const id = req.params.id;
            const toDo = await sequelize.models.ToDoUsingOrm.findByPk(id);
            res.json(toDo);
        } catch (err) {
            console.error(err.message);
        }
    });

    //update a todo
    router.put("/:id", async (req, res) => {
        let test = "";
        try {
            // const { id } = req.params;
            // const { description } = req.body;
            // const updateToDo = await pool.query("update todo set description = $1 where todo_id = $2", [description,id]);

            // res.json("todo was updated");

            const id = req.params.id;
            const description = req.body.description;
            const toDo = await sequelize.models.ToDoUsingOrm.findByPk(id);
            //const updateToDo = await pool.query("update todo set description = $1 where todo_id = $2", [description, id]);
            toDo.description = description;
            await toDo.save();

            res.json("todo was updated");
        } catch (err) {
            console.error(err.message);
        }
    });

    //delete a todo
    router.delete("/:id", async (req, res) => {
        let test = "";
        try {
            // const { id } = req.params;
            // const todo = await pool.query("delete from todo where todo_id = $1", [id]);
            // res.json("todo was deleted");

            const id = req.params.id;
            const toDoToBeDeleted = await sequelize.models.ToDoUsingOrm.findByPk(id);
            await toDoToBeDeleted.destroy();
            res.json("todo was deleted");
        } catch (err) {
            console.error(err.message);
        }
    });

    return router;
}

module.exports = ToDoController;