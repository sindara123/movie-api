import { Router } from "express";
import { registerHandler } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.middleware.js";
import User from "../models/user.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const user = await User.findOne({ email: "dara80@gmail.com" });
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

router.post("/register", validate, registerHandler);

export default router;
