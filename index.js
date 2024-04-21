const express = require("express");
const cors = require("cors");
const ToDoController = require("./controller/ToDoController.js");
const IncubatorController = require("./controller/IncubatorController.js");

const app = express();
//middleware
app.use(cors());
app.use(express.json());

//db
const db = require("./models");

db.sequelize.sync().then((onSuccess) => {
    console.log("db.sequelize.sync() successful");

    //routes
    app.use("/todos", ToDoController(db.sequelize));
    app.use("/incubator", IncubatorController(db.sequelize));

    app.listen(5000, () => {
        console.log("server has started on port 5000");
    });
})



