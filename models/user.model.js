import mongoose from "mongoose";
import { Schema, model } from "mongoose";


const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Le nom est obligatoire"],
    trim: true,
    maxlength: [50, "Le nom ne doit pas dépasser 50 caractères"],
  },
  email: {
    type: String,
    required: [true, "L'e-mail est obligatoire"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Le mot de passe est obligatoire"],
    minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    select: false, // Exclude password from user object retrieval
  },
  verified: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Allowed roles
    default: "user",
  },
}, { timestamps: true });



export const UserModel = mongoose.model("User", userSchema);
