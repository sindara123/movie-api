import { email, z } from "zod";
import e, { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  //verify credentials
  //using zod
  const { error } = validateDTO(req.body);
  if (error)
    return res.status(400).json({
      message: "Validaton Failed.",
      errors: error.issues.map((err) => err.message),
    });

  const exist = await User.findOne({ email: req.body.email });
  if (exist) return res.status(409).json({ message: "User exist!" });

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashPassword);
  //save user in db

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  //issue token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res
    .header({ Authorization: `Bearer ${token}` })
    .status(201)
    .json({
      message: "Registered successful.",
      name: user.name,
      email: user.email,
    });

  //response user
});

const validateDTO = (data) => {
  const schema = z.object({
    name: z.string().min(5, "Name too short.").max(20),
    email: z.email(),
    password: z.string().min(8, "Password too short.").max(50),
  });
  return schema.safeParse(data);
};

export default router;
