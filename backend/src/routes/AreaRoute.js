const routes = require("express").Router();
const areaController = require("../controllers/AreaController");

routes.post("/addarea",areaController.addArea);
routes.get("/getallarea",areaController.getAllArea);
routes.delete("/deleteareabyid/:id",areaController.deleteAreaById);
routes.get("/getareabycity/:cityId",areaController.getAreasByCityId)

module.exports = routes;