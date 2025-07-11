const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cookieParser = require("cookie-parser");
//express object
const app = express();
const cors = require("cors");

app.use(express.json()); //to accept data as json format middleware
app.use(cookieParser());
app.use(cors()); // *
require("dotenv").config();

//http://localhost:3000/test
app.get("/test", (req, res) => {
  console.log("test api called...");
  res.send("hello test api called...");
});

// //http://localhost:3000/users
// app.get("/users", (req, res) => {
//   res.json({
//     message: "user api called..",
//     data: ["ram", "shyam", "hemang"]
//   });
// });

// //http://localhost:3000/employee
// app.get("/employee",(req,res)=>{
//     res.json({
//         message:"employee api called..",
//         data:["ram","shyam","hemang"]
//     })
// })

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
app.use(userRoutes);

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
app.use("/mail",mailRoutes);

//landing page mail
const contactRoutes = require("./src/routes/LandingMail");
app.use("/landingcontact", contactRoutes);

//review add
const reviewRoutes = require("./src/routes/ReviewRoute")
app.use("/review", reviewRoutes)

//payment route
const paymentRoutes = require("./src/routes/PaymentRoute")
app.use("/payment", paymentRoutes)

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
      user: "alpeshpatelvirpur@gmail.com",
      pass: "xopi zvba daav aoub" // Use App Password for security
    }
  });

  let mailOptions = {
    from: email,
    to: "alpeshpatelvirpur@gmail.com",
    subject: `New Contact Form Message from ${email}`,
    text: message
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

//database connection
mongoose.connect("mongodb://127.0.0.1:27017/25_node_internship").then(() => {
  console.log("database connection successful...");
});

//server creation
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server started successfully at PORT", PORT);
});
