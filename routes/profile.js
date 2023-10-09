import express from "express";
import { verifyAccessToken } from "../middleware/accessToken.js";
import { uploadProfileImage } from "../middleware/cloudinary.js";
import upload from "../middleware/multer.js";
import { updateProfile } from "../controllers/profileController.js";
const profileRoutes = express.Router();
profileRoutes.use(verifyAccessToken);

profileRoutes.put(
  "/",
  upload.single("profile"),
  uploadProfileImage,
  updateProfile
);

export default profileRoutes;
