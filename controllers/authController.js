import { passwordEncryption } from "../middleware/passwordMiddleWare.js";
import photographerSchema from "../models/photographerSchema.js";
import {
  BadRequestError,
  InternalServerError,
} from "../request-errors/index.js";

export const registerPhotoGrapher = async (req, res, next) => {
  try {
    const password = await passwordEncryption(req.body.password);
    const user = await photographerSchema.create({ ...req.body, password });
    req.user = user;
    req.userType = "photographer";
    next();
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        return BadRequestError(res, "This Email already Exists!");
      } else if (error.keyPattern?.username) {
        return BadRequestError(res, "This username is not available!");
      }
    }
  }
};

export const updatePassword = async (req, res) => {
  try {
    const password = await passwordEncryption(req.body.password);
    await photographerSchema.updateOne({ email: req.body.email }, { password });
    return res.json({ msg: "Password Updated Successfully!" });
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
