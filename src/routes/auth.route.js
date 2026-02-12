import { z } from "zod";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = Router();

export class AppError extends Error {
  constructor(message, statusCode = 400, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

router.post("/register", async (req, res) => {
  const result = validateRegister(req.body);
  if (!result.success) {
    throw new AppError(
      "Validation Failed",
      400,
      result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      })),
    );
  }
  const { name, email, password } = result.data; // from senitize data
  const exist = await User.findOne({ email });
  if (exist) return res.status(409).json({ message: "User exist!" });

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  console.log(hashPassword);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res
    .header({ Authorization: `Bearer ${token}` })
    .status(201)
    .json({
      message: "Registered successful. Please verify email.",
      name: user.name,
      email: user.email,
    });
});

router.post("/login", async (req, res) => {
  const INVALID = "Invalid username or password.";
  const result = validateLogin(req.body);

  if (!result.success) throw new AppError(INVALID, 401);

  const { email, password } = result.data;
  const user = await User.findOne({ email });
  if (!user) throw new AppError(INVALID, 401);

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new AppError(INVALID, 401);

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res
    .header({ Authorization: `Bearer ${accessToken}` })
    .status(200)
    .json({
      message: "Login successful.",
      name: user.name,
      email: user.email,
    });
});

const validateRegister = (data) => {
  const schema = z.object({
    name: z.string().min(5, "Name too short.").max(20),
    email: z.email(),
    password: z.string().min(8, "Password too short.").max(50),
  });
  return schema.safeParse(data);
};

const validateLogin = (data) => {
  const schema = z.object({
    email: z.email(),
    password: z.string().min(8, "Password too short.").max(50),
  });
  return schema.safeParse(data);
};

export default router;
