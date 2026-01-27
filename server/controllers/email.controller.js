const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  try {
    const { email, message } = req.body;

    if (!email || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Email and message are required" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,      // ✅ подтверждённый sender
      to: process.env.EMAIL_FROM,        // ✅ отправляешь СЕБЕ
      replyTo: email,                    // ✅ email пользователя
      subject: "Contact form message",
      text: message,
    });

    res.json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message, // 👈 покажет реальную причину
    });
  }
};