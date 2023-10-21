import { config } from "dotenv";
import jwt from "jsonwebtoken";
import {
  InternalServerError,
  UnauthorizedError,
} from "../request-errors/index.js";
config();
const secret = process.env.JWT_SECRET;

export const createAccessToken = (req, res) => {
  try {
    const { _id: id, email, role } = req.user;
    const token = jwt.sign({ id, email, role }, secret, { expiresIn: "2d" });
    res.cookie("token", token);
    req.user.password = undefined;
    req.user._id = null;
    req.user.verified = undefined;
    res.json(req.user);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const verifyAccessToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return UnauthorizedError(res, "User is not Authorized!");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, secret);
    req.user = payload;
    next();
  } catch (error) {
    return UnauthorizedError(res, "Your session has expired!");
  }
};
