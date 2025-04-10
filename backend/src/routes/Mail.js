const express = require("express");
const router = express.Router();
const { sendingMail } = require("../utils/MailUtil"); // correct path to mailUtil.js

//mail for status sending of garage
router.post("/send-status-mail", async (req, res) => {
  const { to, status } = req.body;

  try {
    const subject = "Garage Approval Status Update";
    const text =
      status === "approved"
        ? "✅ Your garage has been approved and is now live!"
        : "❌ Your garage was marked as unapproved. Please contact support.";

    await sendingMail(to, subject, text);
    res.status(200).json({ message: "Mail sent successfully" });
  } catch (err) {
    console.error("Email send error:", err);
    res.status(500).json({ message: "Failed to send mail", error: err });
  }
});




module.exports = router;