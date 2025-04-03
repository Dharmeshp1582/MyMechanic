const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      require: true
    },

    model: {
      type: String,
      require: true
    },
    mfgYear: {
      type: Number,
      require: true
    },
    licensePlate:{
        type:String,
        unique:true,
        required:true
      },
    vehicleType: {
      enum: ["two Wheeler", "three Wheeler", "four Wheeler"],
      type: String,
      require: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("vehicles", vehicleSchema);
