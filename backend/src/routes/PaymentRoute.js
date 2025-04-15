const router = require("express").Router();

const paymentController = require("../controllers/PaymentController");

router.post("/create_order", paymentController.create_order);
router.post("/verify_order", paymentController.verify_order);
router.get("/getPaymentsByUser/:userId", paymentController.getPaymentsByUserId);
router.get("/getPaymentByAppointment/:appointmentId", paymentController.getPaymentByAppointmentId);
router.get("/getallpayments", paymentController.getAllPayments)
router.get("/getrevenuechartdata", paymentController.getRevenueChartData)
router.get("/gettotalrevenue", paymentController.getTotalRevenue);
router.get("/getgarageownerpayments/:garageOwnerId", paymentController.getGarageOwnerPayments);
router.get("/getkey", paymentController.getRazorpayKey)


module.exports = router;