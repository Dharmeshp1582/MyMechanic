const routes = require("express").Router();
const mechanicController = require("../controllers/MechanicController");

routes.post("/addmechanic",mechanicController.addMechanic);
routes.get("/getallmechanic",mechanicController.getAllMechanic);
routes.delete("/mechanics/:id",mechanicController.deleteMechanic);

module.exports = routes;