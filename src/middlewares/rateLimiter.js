import rateLimit from "express-rate-limit";

const appLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many request, try again later.",
});

export default appLimiter;
