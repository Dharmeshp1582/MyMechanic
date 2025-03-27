const routes = require("express").Router();
const paymentController = require("../controllers/PaymentController");

routes.post("/addpayment",paymentController.addPayment);
routes.get("/getpaymentbyid/:id",paymentController.getPaymentById);
routes.get("/getallpayments",paymentController.getAllPayments);


module.exports = routes;