const routes = require("express").Router();
const garageController = require("../controllers/GarageController");

routes.post("/addgarage",garageController.addGarage);
routes.get("/getallgarages",garageController.getAllGarages);
routes.post("/addgaragewithfile",garageController.addGarageWithFile);
routes.get("/getgaragebyuserid/:userId",garageController.getAllGaragesByUserId);
routes.put("/updategaragewithfile/:id",garageController.updateGarageWithFile);
routes.get("/getgaragebyid/:id",garageController.getGarageByGarageId);
routes.delete("/deletegarage/:id",garageController.DeletedGarage);
routes.put("/approvegarage/:id", garageController.approveGarage)
routes.get("/getApprovedGarages", garageController.getApprovedGarages)

module.exports =  routes;
