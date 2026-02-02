import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const registerUser = async ({ name, email, password }) => {
  const exist = await User.findOne({ email }).lean();
  if (exist) {
    const error = new Error("User already exist!");
    error.statusCode = 409;
    throw error;
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });

  const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return {
    access_token,
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

export { registerUser };
