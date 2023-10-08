import { passwordEncryption } from "../middleware/passwordMiddleWare.js";
import {
  BadRequestError,
  InternalServerError,
} from "../request-errors/index.js";


export const register = async (req, res, next) => {
  let model = getUsertypeModel(req.body.userType);
  try {
    const password = await passwordEncryption(req.body.password);
    const user = await model.create({ ...req.body, password });
    req.user = user;
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
  let model = getUsertypeModel(req.body.userType);
  try {
    const password = await passwordEncryption(req.body.password);
    await model.updateOne({ email: req.body.email }, { password });
    return res.json({ msg: "Password Updated Successfully!" });
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
