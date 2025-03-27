const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true,
      trim: true//name of the service("oil change","Brake Repair",etc)
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: Number, // Duration in minutes
      required: true
    },
    // mechanic: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Mechanic",
    //   required: true,
    //},
    availability: {
      type: Boolean,
      enum:["Yes","No"],
      default: true
    }
    ,
    userId:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    imageURL: 
      {
        type: String // URL of service images
      },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
    // ,
    // reviews: [
    //   {
    //     user: { type: Schema.Types.ObjectId, ref: "users" },
    //     rating: { type: Number, min: 1, max: 5 },
    //     comment: String
    //   }
    // ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Services", serviceSchema);
