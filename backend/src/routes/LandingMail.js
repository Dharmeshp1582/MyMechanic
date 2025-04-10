const express = require("express");
const router = express.Router();
const { sendingMail } = require("../utils/MailUtil");

router.post("/send-contact", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const content = `New Contact Us message:
Name: ${name}
Email: ${email}
Phone: ${phone || "N/A"}
Subject: ${subject}

Message:
${message}`;

    const to = "alpeshpatelvirpur@gmail.com"; // Your admin email
    await sendingMail(to,`Contact Message:${subject}`, content);

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error("Mail send error:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

module.exports = router;
