const paymentModel = require("../models/PaymentModel");

//add payment
const addPayment = async (req, res) => {
  try {
    const savedPayment = await paymentModel.create(req.body);

    res
      .status(201)
      .json({ message: "Payment created successfully", data: savedPayment });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create payment",
      error: error.message
    });
  }
};

//get payment by id
const getPaymentById = async (req, res) => {
  try {
    const payment = await paymentModel.findById(req.params.id);

    res
      .status(200)
      .json({ message: " get payment by id successfully", data: payment });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving payment",
      error: error.message
    });
  }
};

//get all payments
const getAllPayments = async (req, res) => {
  try {
    const getPayments = await paymentModel.find();
    res
      .status(200)
      .json({ message: "get all payment success", data: getPayments });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving payments",
      error: error.message
    });
  }
};

//delete payment
const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Payment deleted successfully", data: deletedPayment });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting payment",
      error: error.message
    });
  }
};

module.exports = {
  addPayment,
  getPaymentById,
  getAllPayments,
  deletePayment
};
