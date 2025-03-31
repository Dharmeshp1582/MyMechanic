const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  serviceId: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Services", required: true }
  ], // Array of service IDs
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "vehicles",
    required: true
  },
  garageownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "garages",
    required: true
  },
  appointmentDate: { type: Date, required: true },
  basePrice: { type: Number, required: true },
  finalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "pending"
  },
  reason: { type: String, required: true }
});

module.exports = mongoose.model("appointments", appointmentSchema);
