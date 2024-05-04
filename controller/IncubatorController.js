const express = require("express");
const router = express.Router();

function IncubatorController(sequelize){

    //"p?tagid=1234" is called query string
    //'/p/:tagId' is called url params


    function verify(incubator){
        let message = "";

        if (!incubator.name){
            message += "nama masih kosong. ";
            //gak boleh ada "\n" di res.statusMessage
        }
        if (!incubator.location) {
            message += "location masih kosong. ";
        }
        if (!["International", "National","Province"].includes(incubator.level)) {
            message += "level di luar pilihan. ";
        }

        return message;
    }

    router.get("/:id", async (req, res) => {
        let test = "";
        try {
            const id = req.params.id;
            const incubator = await sequelize.models.Incubator.findByPk(id);
            res.json(incubator);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get("/getIncubatorWithItsStartups/:id", async (req, res) => {
        let test = "";
        try {
            const id = req.params.id;
            const incubator = await sequelize.models.Incubator.findByPk(id, {
                include: sequelize.models.Startup
            });
            let jsonIncubator = incubator.toJSON();
            jsonIncubator.valuation = jsonIncubator.Startups.reduce((accumulator, x) => accumulator + x.valuation, 0);
            res.json(jsonIncubator);
        } catch (err) {
            console.error(err.message);
        }
    });


    router.post("/", async (req, res) => {
        let test = "";
        try {
            const incubator = req.body;

            let message = verify(incubator);
            if (message){
                res.statusMessage = message;
                res.status(400).end();
                return;
            }

            let code = "";
            switch (incubator.level){
                case "International":
                    code += "1992-A-";
                    break;
                case "National":
                    code += "1994-B-";
                    break;
                case "Province":
                    code += "1996-C-";
                    break;
            }
            code += new Date().getTime();

            const objToBeSaved = sequelize.models.Incubator.build({
                name: incubator.name,
                location: incubator.location,
                level: incubator.level,
                code: code,
            });

            await objToBeSaved.save();
            res.json(objToBeSaved);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get("/", async (req,res)=>{
        let masuk = "";
        try {
            const incubators = await sequelize.models.Incubator.findAll();
            res.json(incubators);
        } catch (err) {
            console.error(err.message);
        }
    })


    return router;
}
module.exports = IncubatorController;