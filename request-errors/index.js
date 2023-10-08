const CustomError = (res, status, msg) => {
  return res.status(status).json({ msg });
};

export const InternalServerError = (res, msg) => {
  return CustomError(res, 500, msg);
};

export const BadRequestError = (res, msg) => {
  return CustomError(res, 400, msg);
};

export const UnauthorizedError = (res, msg) => {
  return CustomError(res, 401, msg);
};

export const NotFoundError = (res, msg) => {
  return CustomError(res, 404, msg);
};
