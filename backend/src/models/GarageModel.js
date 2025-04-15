const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const garageSchema = new Schema(
  {
    name: {
      type: String,
      required: true
      
    },
    owner: {
      type: String,
      required: true
    },
    avaliability_status: {
      type: Boolean,
      default: false
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "states",
      required: true
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "cities",
      required: true
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: "areas",
      required: true
    },
    openingHours: {
      type: String,
      required: true
    },
    phoneno: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users"
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    imageURL: {
      type: String
    },
    rating: {
      type: Schema.Types.ObjectId,
      ref: "reviews"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("garages", garageSchema);
