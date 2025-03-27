const routes = require("express").Router();
const vehicleController = require("../controllers/VehicleController");

routes.post("/addvehicle",vehicleController.addVehicle);
routes.get("/getallvehicle",vehicleController.getAllVehicles);
routes.delete("/vehicles/:id",vehicleController.deleteVehicleById);
routes.get("/getvehiclebyuserid/:userId",vehicleController.getVehicleByUserId);

module.exports = routes;