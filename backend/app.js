const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
//express object
const app = express();
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();

app.use(express.json()); //to accept data as json format middleware
app.use(cookieParser());
app.use(cors({
  origin:["http://localhost:5173","https://my-mechanic-client.vercel.app"],
  credentials:true
})); // *


//http://localhost:3000/test
app.get("/", (req, res) => {
  console.log("test api called...");
  res.send("hello test api called...");
});

port = process.env.PORT || 5000

// Logout route
app.post("/logout", (req, res) => {
  try {
    res.clearCookie("id", { httpOnly: true, secure: true, sameSite: "None" });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Logout failed" });
  }
});

//import role routes
const roleRoutes = require("./src/routes/RoleRoute"); 
app.use("/role", roleRoutes);

//import user routes
const userRoutes = require("./src/routes/UserRoute");
app.use("/",userRoutes);

//import state routes
const stateRoutes = require("./src/routes/StateRoute");
app.use("/state", stateRoutes);

//import City routes
const cityRoutes = require("./src/routes/CityRoute");
app.use("/city", cityRoutes);

//import area routes
const areaRoutes = require("./src/routes/AreaRoute");
app.use("/area", areaRoutes);

//import service routes
const serviceRoutes = require("./src/routes/ServiceRoute");
app.use("/service", serviceRoutes);

//import garage routes
const garageRoutes = require("./src/routes/GarageRoute");
app.use("/garage", garageRoutes);

//import vehicle routes
const vehicleRoutes = require("./src/routes/VehicleRoute");
app.use("/vehicle", vehicleRoutes);

// import Appointment routes
const appointmentRoutes = require("./src/routes/AppointmentRoute");
app.use("/appointment", appointmentRoutes);

//status mail
const mailRoutes = require("./src/routes/Mail"); // make sure the path is correct
app.use("/mail", mailRoutes);

//landing page mail
const contactRoutes = require("./src/routes/LandingMail");
app.use("/landingcontact", contactRoutes);

//review add
const reviewRoutes = require("./src/routes/ReviewRoute");
app.use("/review", reviewRoutes);

//payment route
const paymentRoutes = require("./src/routes/PaymentRoute");
const  {connectDB}  = require("./src/utils/database");
app.use("/payment", paymentRoutes);

//contact form validation with controller
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Setup nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user:  process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for security
    },
  });

  let mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Message from ${email}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error sending message" });
  }
});



//server creation

app.listen(port, async() => {
   await connectDB()
    console.log("server started successfully at port", port);
  });

