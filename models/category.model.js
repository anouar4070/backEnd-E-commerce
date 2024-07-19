import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "you must enter category name"],
      trim: true,
      minLength: [2, "too short category name "],
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

export const CategoryModel = model("category", categorySchema);
