import { UnauthorizedError } from "../request-errors/index.js";

const verifyRole = (req, res, next) => {
  const roles = ["admin", "team"];
  if (roles.indexOf(req.user.role) !== -1) {
    next();
  } else {
    return UnauthorizedError(res, "You are not authorized to access Admin");
  }
};

export default verifyRole;
