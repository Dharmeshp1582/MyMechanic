const routes = require("express").Router();
const serviceController = require("../controllers/ServiceController");

routes.get("/services", serviceController.getAllServices);
routes.post("/addservice", serviceController.addService);
routes.delete("/service/:id", serviceController.deleteService);
routes.post("/addservicewithfile",serviceController.addServiceWithFile);
routes.put("/updateservice/:id",serviceController.updateService);
routes.get("/getservicesbyuserid/:userId", serviceController.getAllServicesByUserId);
routes.get("/getservicebyid/:id",serviceController.getServiceByServiceId);

module.exports = routes; 