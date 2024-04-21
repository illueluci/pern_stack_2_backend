const express = require("express");
const router = express.Router();

function IncubatorController(sequelize){

    function verify(incubator){
        let message = "";
        return message;
    }

    router.post("/", async (req, res) => {
        let test = "";
        try {
            const incubator = req.body;

            let message = verify(incubator);
            if (message){
                res.statusMessage(message);
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


    return router;
}
module.exports = IncubatorController;