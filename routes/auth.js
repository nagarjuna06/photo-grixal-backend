import express from "express";
import {
  login,
  register,
  updatePassword,
} from "../controllers/authController.js";
import { sendOtp, verifyOtp } from "../middleware/otp.js";
import { sendMail } from "../middleware/sendMail.js";
import { createAccessToken } from "../middleware/accessToken.js";
import apiLimiter from "../middleware/apiLimiter.js";
const authRouter = express.Router();

// authRouter.use(apiLimiter);

authRouter.post("/:userType/register", register, sendOtp, sendMail);

authRouter.post("/:userType/resend", sendOtp, sendMail);

authRouter.post("/:userType/verify", verifyOtp, createAccessToken);

authRouter.post("/:userType/reset", sendOtp, sendMail);

authRouter.put("/:userType/verify", verifyOtp, updatePassword);

authRouter.post("/:userType/login", login, createAccessToken);

export default authRouter;
