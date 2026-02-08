import { Router } from "express";
import { registerHandler } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import User from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.find().select("-password");
  if (users) return res.status(200).json(users);
});

router.post("/register", validate, registerHandler);

export default router;
