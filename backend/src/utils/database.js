const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // Loads .env from project root by default

const connectDB = async () => {
  try {
    // Use environment variable for MongoDB URI for security
    await mongoose.connect(process.env.MONGODB_URI
    );
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1); // Exit the app if connection fails
  }
};

module.exports = { connectDB };