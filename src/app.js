//Express App only
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import usersRoute from "./routes/users.route.js";
import authRoute from "./routes/auth.route.js";
import homeRoute from "./routes/home.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import appLimiter from "./middlewares/rateLimiter.js";
const app = express();

//Global Middleware
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}
app.set("trust proxy", 1);
app.use(appLimiter);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(helmet());
app.use(express.json());

//Routes
app.use("/", homeRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);
app.use(errorHandler);

export default app;
