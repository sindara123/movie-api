import { registerUser } from "../services/user.service.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const registerHandler = asyncHandler(async (req, res, next) => {
  const user = await registerUser(req.body);
  res.status(201).json({ message: "registered.", user });
});

export { registerHandler };
