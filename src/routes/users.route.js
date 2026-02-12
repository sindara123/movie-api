import { Router } from "express";
import { registerHandler } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import User from "../models/user.model.js";
import { AppError } from "./auth.route.js";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  if (users) return res.status(200).json(users);
});

router.post("/register", validate, registerHandler);

router.post("/me", async (req, res) => {
  const authHeader = req.header("Authorization");
  if (!authHeader?.startsWith("Bearer "))
    throw new AppError("Unauthorized", 401, { errors: "invalid token" });

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) throw new AppError("Unauthorized", 401);

  const user = await User.findOne({ _id: decoded.id }).select("-password");
  if (!user) throw new AppError("Unauthorized", 401);

  res.status(200).json(user);
});

export default router;
