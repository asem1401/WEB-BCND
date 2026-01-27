const nodemailer = require("nodemailer");

// создаём transporter для Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Gmail из .env
    pass: process.env.EMAIL_PASS, // App Password из .env
  },
});

exports.sendEmail = async (req, res) => {
  const { subject, message } = req.body;

  // простая валидация
  if (!subject || !message) {
    return res.status(400).json({
      error: "Subject and message are required",
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // от кого
      to: process.env.EMAIL_USER,   // куда (можно себе же)
      subject: subject,
      text: message,
    });

    res.status(200).json({
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      error: "Failed to send email",
    });
  }
};