import { NotFoundError } from "../request-errors/index.js";
import { getUserTypeModel } from "../utils/switchCases.js";

const routeNotFound = (req, res, next) => {
  const { userType } = req.params;
  const users = ["photographer", "customer"];
  if (users.includes(userType)) {
    req.model = getUserTypeModel(userType);
    next();
  } else {
    res.status(404).send(
      `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="utf-8">
          <title>Error</title>
        </head>
        <body>
          <pre>Cannot ${req.method} ${req.originalUrl}</pre>
        </body>
      </html>`
    );
  }
};

export default routeNotFound;
