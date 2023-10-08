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

authRouter.use(apiLimiter);

authRouter.post("/photographer/register", register, sendOtp, sendMail);

authRouter.post("/photographer/resend", sendOtp, sendMail);

authRouter.post("/photographer/verify", verifyOtp, createAccessToken);

authRouter.post("/photographer/reset", sendOtp, sendMail);

authRouter.put("/photographer/verify", verifyOtp, updatePassword);

authRouter.post("/photographer/login", login, createAccessToken);

//customer authentication routes
authRouter.post("/customer/register", register, sendOtp, sendMail);

authRouter.post("/customer/resend", sendOtp, sendMail);

authRouter.post("/customer/verify", verifyOtp, createAccessToken);

authRouter.post("/customer/reset", sendOtp, sendMail);

authRouter.put("/customer/verify", verifyOtp, updatePassword);

authRouter.post("/customer/login", login, createAccessToken);

export default authRouter;
