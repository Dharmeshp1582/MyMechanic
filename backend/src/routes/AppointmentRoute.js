const routes = require("express").Router();
const appointmentController = require("../controllers/AppointmentController");

routes.post("/addappointment",appointmentController.addAppointments);
routes.get("/getappointment",appointmentController.getAllAppointments);
routes.get("/getappointmentbyid/:id",appointmentController.getAppointmentsById);
routes.delete("/deleteappointment",appointmentController.deleteAppointmentById);
routes.get("/getappointmentbyuserid/:userId",appointmentController.getAllAppointmentByUserId
)

module.exports = routes;