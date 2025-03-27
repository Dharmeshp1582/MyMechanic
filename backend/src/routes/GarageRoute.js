const routes = require("express").Router();
const garageController = require("../controllers/GarageController");

routes.post("/addgarage",garageController.addGarage);
routes.get("/getallgarages",garageController.getAllGarages);
routes.post("/addgaragewithfile",garageController.addGarageWithFile);
routes.get("/getgaragebyuserid/:userId",garageController.getAllGaragesByUserId);
routes.put("/updategarage/:id",garageController.updateGarage);
routes.get("/getgaragebyid/:id",garageController.getGarageByGarageId);
routes.delete("/delete/:id",garageController.DeletedGarage)

module.exports =  routes;
