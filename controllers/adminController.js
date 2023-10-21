import adminSchema from "../models/adminSchema.js";
import { InternalServerError, NotFoundError } from "../request-errors/index.js";

export const adminRegister = async (req, res) => {
  try {
    const user = await adminSchema.create({
      ...req.body,
      role: "admin",
    });
    res.json(user);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const user = await adminSchema.findOne({ email: req.body.email });
    if (user) {
      req.user = user;
      next();
    } else {
      return NotFoundError(res, "User not exists");
    }
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const usersList = async (req, res) => {
  try {
    const users = await req.model
      .find({}, { _id: 1, name: 1, email: 1, createdAt: 1 })
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
