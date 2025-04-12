const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    garageId: {
      type: Schema.Types.ObjectId,
      ref: "garages",
      required: true // Uncommented as it's typically needed for reference
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
      // trim: true // Added for clean data storage
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: 0 // Added validation to prevent negative prices
    },
    duration: {
      type: Number,
      required: true,
      min: 1 // Minimum 1 minute duration
    },
    availability: {
      type: String, // Changed from Boolean to String to match your enum
      enum: ["true", "false"],
      default: "true" // Changed to match enum type
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true // Typically needed to track who created the service
    },
    imageURL: {
      type: String,
      trim: true
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Services", serviceSchema);
