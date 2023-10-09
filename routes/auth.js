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

authRouter.post("/register", register, sendOtp, sendMail);

authRouter.post("/resend", sendOtp, sendMail);

authRouter.post("/verify", verifyOtp, createAccessToken);

authRouter.post("/reset", sendOtp, sendMail);

authRouter.put("/verify", verifyOtp, updatePassword);

authRouter.post("/login", login, createAccessToken);

export default authRouter;
