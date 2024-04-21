const express = require("express");
const cors = require("cors");
const connection = require("./postgresql.js");

const ToDoController = require("./controller/ToDoController.js");

const app = express();
//middleware
app.use(cors());
app.use(express.json());

//db
let sequelize;
connection().then((onSuccess)=>{
    sequelize = onSuccess.sequelize;

    //routes
    app.use("/todos", ToDoController(sequelize));
});

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

