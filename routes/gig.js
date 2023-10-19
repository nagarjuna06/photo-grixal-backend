import express from "express";
import {
  createGig,
  deleteGig,
  getPhotographerGigs,
  updateGig,
} from "../controllers/gigController.js";
import upload from "../middleware/multer.js";
import { multipleGigImages } from "../middleware/cloudinary.js";
import { verifyAccessToken } from "../middleware/accessToken.js";

const gigRoutes = express.Router();

gigRoutes.use(verifyAccessToken);

gigRoutes.get("/", getPhotographerGigs);

gigRoutes.post("/", upload.array("gig_image"), createGig, multipleGigImages);

gigRoutes.put("/:gigId", updateGig);

gigRoutes.delete("/:gigId", deleteGig);

export default gigRoutes;
