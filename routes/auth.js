import express from "express";
import {
  registerPhotoGrapher,
  updatePassword,
} from "../controllers/authController.js";
import { sendOtp, verifyOtp } from "../middleware/otp.js";
import { sendMail } from "../middleware/sendMail.js";
const authRouter = express.Router();

authRouter.post(
  "/photographer/register",
  registerPhotoGrapher,
  sendOtp,
  sendMail
);

authRouter.post("/photographer/resend", sendOtp, sendMail);

authRouter.post("/photographer/verify", verifyOtp, () => {});

authRouter.post("/photographer/reset", sendOtp, sendMail);

authRouter.put("/photographer/verify", verifyOtp, updatePassword);

export default authRouter;
