const routes = require("express").Router();
const appointmentController = require("../controllers/AppointmentController");

routes.post("/addappointment",appointmentController.addAppointments);
routes.get("/getappointment",appointmentController.getAllAppointments);
routes.get("/getappointmentbyid/:id",appointmentController.getAppointmentsById);
routes.delete("/deleteappointment",appointmentController.deleteAppointmentById);
routes.get("/getappointmentbyuserid/:userId",appointmentController.getAllAppointmentByUserId
)
routes.get("/getappointmentbygarageownerid/:garageownerId",appointmentController.getAppointmentByGarageownerId);
routes.put("/updatestatus/:id",appointmentController.UpdateStatus);
// routes.get("/getappointmentbyuserid/:userId", appointmentController.getappointmentByUserId);
module.exports = routes;