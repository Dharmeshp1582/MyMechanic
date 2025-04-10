const Razorpay = require("razorpay");
const crypto = require("crypto");
const paymentModel = require("../models/PaymentModel");
const appointmentModel = require("../models/AppointmentModel");
const { sendingMail } = require("../utils/MailUtil");

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: "rzp_test_TLAOGmfDbK3zor",
  key_secret: "MmScO4oyfCk1mGQIMVQsJBB6",
});

// 1️⃣ Create Order
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

module.exports = {
  create_order,
  verify_order,
};