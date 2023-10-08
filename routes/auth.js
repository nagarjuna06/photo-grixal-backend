import express from "express";
import {
  register,
  updatePassword,
} from "../controllers/authController.js";
import { sendOtp, verifyOtp } from "../middleware/otp.js";
import { sendMail } from "../middleware/sendMail.js";
const authRouter = express.Router();

authRouter.post(
  "/photographer/register",
  register,
  sendOtp,
  sendMail
);

authRouter.post("/photographer/resend", sendOtp, sendMail);

authRouter.post("/photographer/verify", verifyOtp, () => {});

authRouter.post("/photographer/reset", sendOtp, sendMail);

authRouter.put("/photographer/verify", verifyOtp, updatePassword);

authRouter.post(
  "/customer/register",
  register,
  sendOtp,
  sendMail
);

authRouter.post("/customer/resend", sendOtp, sendMail);

authRouter.post("/customer/verify", verifyOtp, () => {});

authRouter.post("/customer/reset", sendOtp, sendMail);

authRouter.put("/customer/verify", verifyOtp, updatePassword);


export default authRouter;
