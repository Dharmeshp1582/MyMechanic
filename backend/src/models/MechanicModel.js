const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mechanicSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId:{
       type: String
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    expertise: {
      type: String, // List of skills/expertise
      enum: ["Car Repair", "Bike Repair", "General Service", "Electrical Work", "Painting", "Other"],
      required: true,
    },
    experience: {
      type: Number, // Years of experience
      required: true,
    },
    garageId:{
      type: Schema.Types.ObjectId,
      ref:"garages"
    },
      coordinates: {
        type: Number, // [longitude, latitude]
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      stateId:{
        type: Schema.Types.ObjectId,
        ref:"states"
      }
    ,
    cityId:{
      type:Schema.Types.ObjectId,
      ref: "cities"
    },
    areaId:{
     type: Schema.Types.ObjectId,
     ref:"areas"
    },
    availability: {
      type: Boolean,
      default: true,
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Services", // References the services provided by the mechanic
      },
    ],
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        user: { type: Schema.Types.ObjectId, ref: "users" },
        rating: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    profileImage: {
      type: String, // URL of profile picture
    }
  },
  { timestamps: true }
);

// Add geospatial index for location
// mechanicSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Mechanic", mechanicSchema);