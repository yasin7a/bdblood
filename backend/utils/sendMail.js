const nodemailer = require("nodemailer");

function genOTP() {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randomValue = Math.round(Math.random() * 9);
    otp += randomValue;
  }
  return otp;
}

async function sendMail(email, subject, OTP) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      // secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: `
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
      `,
    });
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = {
  sendMail,
  genOTP,
};
