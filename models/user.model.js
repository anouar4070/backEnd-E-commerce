import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "you must enter user name"],
      lowercase: true,
      trim: true,
      maxlength: [50, "the name should have maximum 50 char"],
    },
    email: {
      type: String,
      required: [true, "e-mail is required"],
      trim: true,
      unique: true,
      minlength: 1,
    },
    password: {
      type: String,
      required: [true, "password required"],
      minlength: [6, "min 6 character password"],
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },

    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Allowed roles
      default: "user",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("user", userSchema);
