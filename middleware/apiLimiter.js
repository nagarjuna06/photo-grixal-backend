import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 5,
  message: { msg: "Request limit reached.Please try again after 5 minutes!" },
});

export default apiLimiter;
