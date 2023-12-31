import { config } from "dotenv";
import otpTemplate from "../templates/otpTemplate.js";
import { createTransport } from "nodemailer";
import { InternalServerError } from "../request-errors/index.js";

config();
const { USER: user, PASS: pass, CLIENT_ORIGIN: site } = process.env;

const transport = createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});

export const sendMail = async (req, res) => {
  const { name, recipient, otp, subject, role } = req.mail;
  const mailOptions = {
    from: user,
    to: recipient,
    subject,
    html: otpTemplate(name, otp, site, role),
  };
  try {
    await transport.sendMail(mailOptions);
    res.json({ msg: `OTP sent to Email:${recipient}` });
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
