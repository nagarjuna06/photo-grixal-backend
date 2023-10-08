import { config } from "dotenv";
import jwt from "jsonwebtoken";
import { InternalServerError } from "../request-errors/index.js";
config();
const secret = process.env.JWT_SECRET;

export const createAccessToken = (req, res) => {
  try {
    const { _id: id, email } = req.user;
    const token = jwt.sign({ id, email }, secret, { expiresIn: "2d" });
    res.cookie("token", token);
    req.user.password = undefined;
    res.json(req.user);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
