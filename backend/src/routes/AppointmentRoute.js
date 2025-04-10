const routes = require("express").Router();
const appointmentController = require("../controllers/AppointmentController");

routes.post("/addappointment", appointmentController.addAppointments);
routes.get("/getappointment", appointmentController.getAllAppointments);
routes.get(
  "/getappointmentbyuserid/:userId",
  appointmentController.getAppointmentsById
);


routes.delete(
  "/deleteappointment/:id",
  appointmentController.deleteAppointmentById
);
routes.get("/getappointmentbyid/:userId", appointmentController.getAllAppointmentByUserId);//for fetch details at user side

routes.get("/getappointmentsbygarageowneruserid/:userId",appointmentController.getAppointmentsByGarageownerUserId)
routes.put("/updatestatus/:id/status", appointmentController.UpdateStatus)

module.exports = routes;
