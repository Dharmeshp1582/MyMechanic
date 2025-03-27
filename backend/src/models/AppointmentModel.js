const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true }], // Array of service IDs
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },
  garageownerId: { type: mongoose.Schema.Types.ObjectId, ref: "GarageOwner", required: true },
  appointmentDate: { type: Date, required: true },
  basePrice: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  reason: { type: String, required: true },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
