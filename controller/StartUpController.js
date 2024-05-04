const express = require("express");
const router = express.Router();

function StartUpController(sequelize) {

    function getYearDifference(stringDate1, stringDate2){
        //const date1 = new Date('7/13/2010');
        const date1 = new Date(stringDate1);
        const date2 = new Date(stringDate2);
        const diffTime = Math.abs(date2 - date1);
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365)); 
        return diffYears;
    }

    function verify(startup){
        let message = "";

        if (!startup.startUpName){
            message += "nama startup kosong. ";
        }
        if (!startup.founderName) {
            message += "founderName kosong. ";
        }
        if (!startup.educationOfFounder) {
            message += "educationOfFounder kosong. ";
        }
        if (!startup.roleOfFounder) {
            message += "roleOfFounder kosong. ";
        }
        if (!startup.dateFound) {
            message += "dateFound kosong. ";
        }
        if (!startup.valuation) {
            message += "valuation kosong. ";
        }
        if (!startup.incubatorId) {
            message += "incubatorId kosong. ";
        }

        if (!["SMA", "S1", "S2", "S3"].includes(startup.educationOfFounder)) {
            message += "education of founder tidak ada di pilihan!"
        }
        if (!["Hustler", "Hacker", "Hipster"].includes(startup.roleOfFounder)) {
            message += "role of founder tidak ada di pilihan!"
        }

        let yearDifference = getYearDifference(new Date().toISOString().slice(0, 10), new Date(startup.dateFound).toISOString().slice(0, 10));
        if (yearDifference < 5){
            message += "usia berdiri startup minimal 5 tahun! ";
        }
        if (startup.roleOfFounder === "Hustler" && (!["S2", "S3"].includes(startup.educationOfFounder))) {
            message += "role of founder hustler hanya dapat ditempati founder dengan pendidikan minimal s2! ";
        }
        
        return message;
    }

    router.get("/getWithRoleFilter", async (req, res) => {
        let masuk = "";
        try {
            // const incubators = await sequelize.models.Incubator.findAll();
            // res.json(incubators);
            const query = req.query;
            const roleFilter = query.roleFilter;

            let whereObj = {};
            if (roleFilter){
                whereObj = {
                    roleOfFounder: roleFilter
                };
            }

            const startUps = await sequelize.models.Startup.findAll({
                where: whereObj,
                attributes: ["id", "startUpName", "founderName","roleOfFounder", "valuation"],
                order: [["roleOfFounder", "DESC"]],
                include: {
                    model: sequelize.models.Incubator,
                    attributes: ["code"]
                }
                
            });
            //const jsonStartUps = startUps.toJSON();
            let test = startUps[0].toJSON();
            res.json(startUps);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.get("/:id", async (req,res) => {
        let masuk = "";
        try {
            // const incubators = await sequelize.models.Incubator.findAll();
            // res.json(incubators);
            const id = req.params.id;
            const startUp = await sequelize.models.Startup.findByPk(id, { 
                include: sequelize.models.Incubator 
            });
            const jsonStartUp = startUp.toJSON();
            res.json(jsonStartUp);
        } catch (err) {
            console.error(err.message);
        }
    });

    router.post("/", async (req, res) => {
        let test = "";
        try {
            const startup = req.body;

            let message = verify(startup);
            if (message) {
                res.statusMessage = message;
                res.status(400).end();
                return;
            }

            const objToBeSaved = sequelize.models.Startup.build({
                startUpName: startup.startUpName,
                founderName: startup.founderName,
                educationOfFounder: startup.educationOfFounder,
                roleOfFounder: startup.roleOfFounder,
                dateFound: startup.dateFound,
                IncubatorId: startup.incubatorId,
                valuation: startup.valuation
            });
            await objToBeSaved.save();
            res.json(objToBeSaved);

        } catch (err) {
            console.error(err.message);
        }
    });

    router.put("/", async (req, res) => {
        let test = "";
        try {
            const startup = req.body;

            let message = verify(startup);
            if (message) {
                res.statusMessage = message;
                res.status(400).end();
                return;
            }

            const startUpToBeEdited = await sequelize.models.Startup.findByPk(startup.id);

            startUpToBeEdited.startUpName = startup.startUpName;
            startUpToBeEdited.founderName = startup.founderName;
            startUpToBeEdited.educationOfFounder = startup.educationOfFounder;
            startUpToBeEdited.roleOfFounder = startup.roleOfFounder;
            startUpToBeEdited.dateFound = startup.dateFound;
            startUpToBeEdited.valuation = startup.valuation;

            await startUpToBeEdited.save();
            res.json(startUpToBeEdited);

        } catch (err) {
            console.error(err.message);
        }
    });

    router.delete("/:id", async (req, res) => {
        let test = "";
        try {
            const id = req.params.id;
            const startUpToBeDeleted = await sequelize.models.Startup.findByPk(id);
            await startUpToBeDeleted.destroy();
            res.json("startup was deleted");
        } catch (err) {
            console.error(err.message);
        }
    });
    

    return router;
}
module.exports = StartUpController;