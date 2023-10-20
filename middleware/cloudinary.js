import { v2 as cloudinary } from "cloudinary";
import { InternalServerError } from "../request-errors/index.js";
import { config } from "dotenv";
import gigsSchema from "../models/gigsSchema.js";
config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export default cloudinary;

export const uploadProfileImage = async (req, res, next) => {
  const image = req.file;
  const userId = req.user.id;
  const publicId = `photoGrixal/profiles/${userId}`;
  // if (!image) {
  //   next();
  // }
  try {
    const result = await cloudinary.uploader.upload(image.path, {
      public_id: publicId,
      resource_type: "image",
      transformation: [
        { width: 400, crop: "scale" },
        { format: "jpg", quality: "auto" },
      ],
    });
    req.body.avatar = result.secure_url;
    next();
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const multipleGigImages = async (req, res) => {
  const files = req.files;
  let images = [];
  try {
    for (var i = 0; i < files.length; i++) {
      const publicId = `photoGrixal/gigs/${req.body._id}_${i}`;
      const result = await cloudinary.uploader.upload(files[i].path, {
        public_id: publicId,
        resource_type: "image",
        transformation: [{ width: 1000, crop: "scale" }, { quality: "auto" }],
      });
      images.push(result.secure_url);
    }
    const gig = await gigsSchema.findOneAndUpdate(
      { _id: req.body._id },
      { images },
      { new: true }
    );
    return res.json(gig);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
