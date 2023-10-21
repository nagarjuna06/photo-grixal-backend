import express from "express";
import { uploadProfileImage } from "../middleware/cloudinary.js";
import upload from "../middleware/multer.js";
import { updateProfile } from "../controllers/profileController.js";
import routeNotFound from "../middleware/route-not-found.js";

const profileRoutes = express.Router();

profileRoutes.put(
  "/:userType",
  routeNotFound,
  upload.single("profile"),
  uploadProfileImage,
  updateProfile
);

export default profileRoutes;
