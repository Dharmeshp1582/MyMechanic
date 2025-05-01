const routes = require("express").Router();
const vehicleController = require("../controllers/VehicleController");

routes.post("/addvehicle",vehicleController.addVehicle);
routes.get("/getallvehicle/:id",vehicleController.getAllVehicles);
routes.delete("/deletevehicles/:id",vehicleController.deleteVehicleById);
routes.get("/getvehiclebyuserid/:userId",vehicleController.getVehicleByUserId);
routes.put("/updatevehicle/:id",vehicleController.updateVehicleById);

module.exports = routes;