import { v2 as cloudinary } from "cloudinary";
import { InternalServerError } from "../request-errors/index.js";
import { config } from "dotenv";
config();
const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const uploadProfileImage = async (req, res, next) => {
  const image = req.file;
  const userId = req.user.id;
  const publicId = `photoGrixal/profiles/${userId}`;
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
