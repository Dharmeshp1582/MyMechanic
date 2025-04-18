const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    contact: {
      type: String
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: "roles"
    },
    imageURL:{
      type: String
    },
    status:{
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
