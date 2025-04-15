const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentModel = require("../models/PaymentModel");
const appointmentModel = require("../models/AppointmentModel");
const { sendingMail } = require("../utils/MailUtil");

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret:  process.env.RAZORPAY_SECRET,
});

const getRazorpayKey = (req, res) => {
  res.status(200).json({ key: razorpay.key_id});
};

//  Create Order
const create_order = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  const options = {
    amount: amount , // paise
    currency,
    receipt,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (err) {
    console.error("Error creating Razorpay order:", err.message);
    res.status(500).json({ message: "Something went wrong while creating order" });
  }
};


// const verify_order = async (req, res) => {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       appointmentId,
//       userId,
//       amount,
//     } = req.body;
  
//     const secret = razorpay.key_secret;
  
//     const hash = crypto
//       .createHmac("sha256", secret)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");
  
//     if (hash === razorpay_signature) {
//       try {
//         const newPayment = new paymentModel({
//           appointmentId,
//           userId,
//           razorpay_order_id,
//           razorpay_payment_id,
//           razorpay_signature,
//           amount,
//           status: "success",
//         });
  
//         await newPayment.save();
  
//         // Update appointment isPaid
//         const updatedAppointment = await appointmentModel.findByIdAndUpdate(
//           appointmentId,
//           { isPaid: true },
//           { new: true }
//         ).populate("userId");
  
//         // 📨 Send payment success email
//         const userEmail = updatedAppointment.userId.email;
//         const userName = updatedAppointment.userId.fullName;
//         await sendingMail(
//           userEmail,
//           "Payment Successful ✅",
//           `<p>Hello ${userName},</p>
//            <p>Your payment of ₹${amount / 100} for your appointment has been received successfully.</p>
//            <p>Thank you for using our MY Mechanic platform 🚗🔧</p>`
//         );
  
//         res.status(200).json({ message: "Payment verified and saved successfully!" });
//       } catch (err) {
//         console.error("Payment saving error:", err.message);
//         res.status(500).json({ message: "Payment verified but saving failed" });
//       }
//     } else {
//       res.status(400).json({ status: "failure", message: "Invalid signature" });
//     }
//   };

const verify_order = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    appointmentId,
    userId,
    amount,
  } = req.body;

  const secret = razorpay.key_secret;

  const hash = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (hash === razorpay_signature) {
    try {
      const newPayment = new paymentModel({
        appointmentId,
        userId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        status: "success",
      });

      await newPayment.save();

      // Update appointment isPaid
      const updatedAppointment = await appointmentModel.findByIdAndUpdate(
        appointmentId,
        { isPaid: true },
        { new: true }
      ).populate("userId","fullName email contact");

      // 📨 Send payment success email
      const userEmail = updatedAppointment.userId.email;
      const userName = updatedAppointment.userId.fullName;
      await sendingMail(
          userEmail,
          "Payment Successful ✅",
          "",
          `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0d6efd;">Payment Confirmation</h2>
            <p>Hi <strong>${userName}</strong>,</p>
        
            <p>We are pleased to inform you that your payment of <strong>₹${amount /100}</strong> for your appointment has been <span style="color: green;"><strong>successfully received</strong></span>.</p>
        
            <p>We truly appreciate your trust in our services. Our team will ensure your vehicle receives the best care at the scheduled time.</p>
        
            <hr style="margin: 20px 0;">
        
            <p style="margin-bottom: 5px;">📅 <strong>Appointment ID:</strong> ${appointmentId}</p>
            <p style="margin-bottom: 5px;">💳 <strong>Payment Amount:</strong> ₹${amount /100}</p>
            <p style="margin-bottom: 20px;">🕐 <strong>Status:</strong> Successful</p>
        
            <p>If you have any questions, feel free to reach out to our support team.</p>
        
            <p style="margin-top: 30px;">Thanks for choosing <strong>My Mechanic</strong> 🚗🔧</p>
        
            <p style="font-size: 14px; color: #888;">This is an automated message. Please do not reply directly to this email.</p>
          </div>
          `
        );
        

      res.status(200).json({ message: "Payment verified and saved successfully!" });
    } catch (err) {
      console.error("Payment saving error:", err.message);
      res.status(500).json({ message: "Payment verified but saving failed" });
    }
  } else {
    res.status(400).json({ status: "failure", message: "Invalid signature" });
  }
};

const getPaymentsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const payments = await paymentModel.find({ userId })
  .populate({
    path: "appointmentId",
    populate: [
      { path: "serviceId", model: "Services" },
      { path: "garageownerId", model: "garages", select: "name" },
      { path: "vehicleId", model: "vehicles" },
    ]
  })
  .sort({ createdAt: -1 });


    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Error fetching payments by user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const getPaymentByAppointmentId = async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const payment = await paymentModel.findOne({ appointmentId }).populate("userId","fullName email contact");
    if (!payment) {
      return res.status(404).json({ message: "No payment found for this appointment" });
    }

    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getAllPayments = async (req, res) => {
  try {
    const payments = await paymentModel.find()
      .populate("userId", "fullName email contact")
      .populate({
        path: "appointmentId",
        populate: [
          { path: "serviceId", model: "Services" },
          { path: "garageownerId", model: "garages", select: "name" },
          { path: "vehicleId", model: "vehicles" }
        ]
      })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("Error fetching all payments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getRevenueChartData = async (req, res) => {
  try {
    const revenueData = await paymentModel.aggregate([
      {
        $match: {
          status: "success" // Only include successful payments
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: "$_id",
          total: 1
        }
      }
    ]);

    res.status(200).json(revenueData);
  } catch (err) {
    console.error("Revenue chart error:", err);
    res.status(500).json({ error: "Failed to fetch revenue chart data" });
  }
};



const getTotalRevenue = async (req, res) => {
  try {
    const payments = await paymentModel.find({ status: "success" }); // Make sure your successful payments use this status
    const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
    res.status(200).json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch revenue", error: err.message });
  }
};

const getGarageOwnerPayments = async (req, res) => {
  try {
    const garageOwnerId = req.params.garageOwnerId;

    const payments = await paymentModel.find()
      .populate({
        path: "appointmentId",
        populate: [
          { path: "serviceId", select: "name" },
          { path: "vehicleId", select: "model" },
          {
            path: "garageownerId", // this is the garage
            populate: {
              path: "userId", // the actual garage owner
              select: "fullName _id"
            }
          }
        ],
      })
      .populate("userId", "fullName contact") // user who booked
      .sort({ createdAt: -1 });

    // Filter by matching the userId of the garage to the given garageOwnerId
    const filteredPayments = payments.filter(
      (p) =>
        p.appointmentId?.garageownerId?.userId?._id.toString() === garageOwnerId
    );

const totalRevenue = filteredPayments.reduce(
  (acc, curr) => acc + (curr.amount || 0),
  0
);

    res.status(200).json({ data: filteredPayments, totalRevenue });
  } catch (error) {
    console.error("Error fetching garage owner payments:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  create_order,
  verify_order,
  getPaymentsByUserId,
  getPaymentByAppointmentId,
  getTotalRevenue,
  getRevenueChartData,
  getAllPayments,
  getGarageOwnerPayments,
  getRazorpayKey
};