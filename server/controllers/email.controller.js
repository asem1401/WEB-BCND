const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res) => {
  try {
    const { email, message } = req.body;

    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"Mini Recipe Book" <test@ethereal.email>',
      to: email,
      subject: "Contact form message",
      text: message,
    });

    res.json({
      success: true,
      preview: nodemailer.getTestMessageUrl(info),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};