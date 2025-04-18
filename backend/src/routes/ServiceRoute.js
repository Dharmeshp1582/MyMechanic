const routes = require("express").Router();
const serviceController = require("../controllers/ServiceController");

routes.get("/services", serviceController.getAllServices);
routes.post("/addservice", serviceController.addService);
// routes.delete("/service/:id", serviceController.deleteService);
routes.post("/addservicewithfile",serviceController.addServiceWithFile);
routes.put("/updateservice/:id",serviceController.updateServiceWithFile);
routes.get("/getservicesbyuserid/:userId", serviceController.getAllServicesByUserId);
routes.get("/getservicebyid/:id",serviceController.getservicebyId);
routes.get("/getservicesbygarageid/:id",serviceController.getServicesByGarageId); //for fetch perticular service data

routes.delete("/delete/:serviceId",serviceController.deleteServiceById);
module.exports = routes; 