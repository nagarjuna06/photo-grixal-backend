import adminSchema from "../models/adminSchema.js";
import otpModel from "../models/otpSchema.js";

import {
  BadRequestError,
  InternalServerError,
} from "../request-errors/index.js";
import { getOtpPurpose, getUserTypeModel } from "../utils/switchCases.js";

export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

export const sendOtp = async (req, res, next) => {
  try {
    const otp = generateOtp();
    const email = req.body.email;
    const role = req.params?.userType ? req.params.userType : req.user.role;
    let model;
    let subject = getOtpPurpose(req.body.purpose);
    if (req.params?.userType) {
      model = getUserTypeModel(req.params.userType);
    } else {
      model = adminSchema;
    }

    let name = null;
    if ("name" in req.body) {
      name = req.body.name;
    } else {
      const user = await model.findOne({ email }, { name: 1, _id: 0 });
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
    req.mail = {
      name,
      recipient: email,
      otp,
      subject,
      role,
    };
    next();
  } catch (err) {
    res.status(500);
    res.send({ msg: err.message });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email: recipient, otp, role = "" } = req.body;

    let model;

    if (req.params.userType) {
      model = getUserTypeModel(req.params.userType);
    } else {
      model = adminSchema;
    }

    const exist = await otpModel.findOne({ recipient });

    if (exist) {
      if (exist.otp == otp) {
        await otpModel.deleteOne({ recipient, otp });
        const user = await model.findOneAndUpdate(
          { email: recipient },
          { verified: true },
          { new: true }
        );

        req.user = user;
        req.user.role = req.params?.userType ? req.params.userType : role;
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
