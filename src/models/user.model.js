import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
  },
  { timestamps: true, strict: true },
);

const User = model("User", userSchema);

export default User;
