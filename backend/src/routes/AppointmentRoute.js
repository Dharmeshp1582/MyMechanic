const routes = require("express").Router();
const appointmentController = require("../controllers/AppointmentController");

routes.post("/addappointment", appointmentController.addAppointments);
routes.get("/getappointment", appointmentController.getAllAppointments);
routes.get(
  "/getappointmentbyid/:id",
  appointmentController.getAppointmentsById
);

routes.delete(
  "/deleteappointment/:id",
  appointmentController.deleteAppointmentById
);

//delete appointment at user side 
routes.put("/cancel/:id", appointmentController.cancelAppointment);


routes.get("/getappointmentbyuserid/:userId", appointmentController.getAllAppointmentByUserId);//for fetch details at user side

routes.get("/getappointmentsbygarageowneruserid/:userId",appointmentController.getAppointmentsByGarageownerUserId)
routes.put("/updatestatus/:id/status", appointmentController.UpdateStatus)
routes.put("/updatevehiclereturnstatus/:id",appointmentController.updateVehicleReturnStatus);

module.exports = routes;
