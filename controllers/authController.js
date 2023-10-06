import { passwordEncryption } from "../middleware/passwordMiddleWare.js";
import photographerSchema from "../models/photographerSchema.js";

export const register = async (req, res, next) => {
  try {
    const password = await passwordEncryption(req.body.password);
    const user = await photographerSchema.create({ ...req.body, password });
    req.user = user;
    next();
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern?.email) {
        res.json({ msg: "This Email already Exists!" });
      } else if (error.keyPattern?.username) {
        res.json({ msg: "This username is not available!" });
      }
    }
  }
};
