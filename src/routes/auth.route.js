import { z } from "zod";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  const { error } = validate(req.body);
  if (error)
    return res.status(400).json({
      message: "Validation Error!",
      errors: error.issues,
    });
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res
    .status(200)
    .header({ Authorization: `Bearer ${token}` })
    .json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
});

const validate = (data) => {
  const schema = z.object({
    name: z.string().min(5, "Name too short.").max(25),
    email: z.email("Invalid email"),
    password: z.string().min(5, "Password at least 5 characters.").max(1024),
  });
  return schema.safeParse(data);
};

export default router;
