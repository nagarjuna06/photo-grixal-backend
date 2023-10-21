import {
  comparePassword,
  passwordEncryption,
} from "../middleware/passwordMiddleWare.js";
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError,
} from "../request-errors/index.js";

export const register = async (req, res, next) => {
  try {
    const password = await passwordEncryption(req.body.password);
    const user = await req.model.create({ ...req.body, password });
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
  try {
    const password = await passwordEncryption(req.body.password);
    await req.model.updateOne({ email: req.body.email }, { password });
    return res.json({ msg: "Password Updated Successfully!" });
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await req.model.findOne({ email });
    if (user) {
      const valid = await comparePassword(password, user.password);
      if (!user.verified) {
        return UnauthorizedError(res, "User not verified!");
      } else if (valid) {
        req.user = user;
        req.user.role = req.params.userType;
        next();
      } else {
        return UnauthorizedError(res, "Incorrect password!");
      }
    } else {
      return BadRequestError(res, "User not exist!");
    }
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
