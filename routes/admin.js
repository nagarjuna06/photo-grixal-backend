import { Router } from "express";
import {
  adminLogin,
  adminRegister,
  usersList,
} from "../controllers/adminController.js";
import { sendOtp, verifyOtp } from "../middleware/otp.js";
import { sendMail } from "../middleware/sendMail.js";
import {
  createAccessToken,
  verifyAccessToken,
} from "../middleware/accessToken.js";
import verifyRole from "../middleware/verifyRole.js";
import routeNotFound from "../middleware/route-not-found.js";

const adminRouter = Router();

adminRouter.post("/register", adminRegister);

adminRouter.post("/login", adminLogin, sendOtp, sendMail);

adminRouter.post("/verify", verifyOtp, createAccessToken);

adminRouter.use(verifyAccessToken);

adminRouter.use(verifyRole);

adminRouter.get("/users/:userType", routeNotFound, usersList);

export default adminRouter;
