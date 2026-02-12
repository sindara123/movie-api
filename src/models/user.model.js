import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true, //already created index
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 60,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "staff", "manager"],
      required: true,
      default: "customer",
    },
    forceChangePassword: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerifyUsed: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: Date,
    status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    deletedAt: Date,
  },
  { timestamps: true, strict: true },
);

const User = model("User", userSchema);

export default User;
