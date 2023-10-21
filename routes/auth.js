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
import routeNotFound from "../middleware/route-not-found.js";

const authRouter = express.Router();

authRouter.use(apiLimiter);

authRouter.post(
  "/:userType/register",
  routeNotFound,
  register,
  sendOtp,
  sendMail
);

authRouter.post("/:userType/resend", routeNotFound, sendOtp, sendMail);

authRouter.post(
  "/:userType/verify",
  routeNotFound,
  verifyOtp,
  createAccessToken
);

authRouter.post("/:userType/reset", routeNotFound, sendOtp, sendMail);

authRouter.put("/:userType/verify", routeNotFound, verifyOtp, updatePassword);

authRouter.post("/:userType/login", routeNotFound, login, createAccessToken);

export default authRouter;
