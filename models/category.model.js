import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom de la catégorie est obligatoire"],
      trim: true,
      minLength: [2, "category name too short"],
      unique: true,
    },
    slug: {
      type: String,

      lowercase: true,
      index: true,
    },
    image: String,
  },
  { timestamps: true }
); // Add timestamps for automatic creation/update tracking

export const CategoryModel = mongoose.model("category", categorySchema);
