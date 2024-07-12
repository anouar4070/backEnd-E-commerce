import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Le nom de la catégorie est obligatoire"],
    trim: true,
    maxlength: [50, "Le nom de la catégorie ne doit pas dépasser 50 caractères"], 
    unique: true, 
  },
  slug: {
    type: String,
    unique: true, 
    lowercase: true,
    index: true, 
  },
  image: {
    type: String,
    trim: true,
  },
}, { timestamps: true }); // Add timestamps for automatic creation/update tracking

export const CategoryModel = mongoose.model("Category", categorySchema);
