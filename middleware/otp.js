import otpModel from "../models/otpSchema.js";
import photographerSchema from "../models/photographerSchema.js";
import {
  BadRequestError,
  InternalServerError,
} from "../request-errors/index.js";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendOtp = async (req, res, next) => {
  try {
    const otp = generateOtp();
    const email = req.body.email;
    const purpose = req.body.purpose;
    let subject = null;
    switch (purpose) {
      case "register":
        subject = "OTP Verification";
        break;
      case "resend":
        subject = "OTP Verification";
        break;
      case "reset":
        subject = "OTP for Password Reset verification";
        break;
      default:
        subject = "";
    }

    let name = null;
    if ("name" in req.body) {
      name = req.body.name;
    } else {
      const user = await photographerSchema.findOne(
        { email },
        { name: 1, _id: 0 }
      );
      name = user ? user.name : null;
    }
    if (!name) {
      res.status(404).json({
        msg: "Sorry, we don't recognize that Email.You can sign up",
      });
      return;
    }
    await otpModel.updateOne(
      { recipient: email },
      { recipient: email, otp },
      { upsert: true }
    );
    req.mail = { name, recipient: email, otp, subject };
    next();
  } catch (err) {
    res.status(500);
    res.send({ msg: err.message });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email: recipient, otp } = req.body;

    const exist = await otpModel.findOne({ recipient });
    if (exist) {
      if (exist.otp == otp) {
        await otpModel.deleteOne({ recipient, otp });
        await photographerSchema.updateOne(
          { email: recipient },
          { verified: true }
        );
        next();
      } else {
        return BadRequestError(res, "Incorrect OTP.You can try again");
      }
    } else {
      return BadRequestError(res, "OTP has Expired.");
    }
  } catch (err) {
    return InternalServerError(res, err.message);
  }
};
