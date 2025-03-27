const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    appointmentId: {
      type: Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },
    amountPaid: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "Net Banking", "UPI", "Cash", "Other"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed"],
      default: "pending",
    },
    transactionId: {
      type: String,
      unique: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
