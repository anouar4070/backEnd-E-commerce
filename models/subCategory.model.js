import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Le nom de la sous-catégorie est obligatoire"],
    trim: true,
    maxlength: [50, "Le nom de la sous-catégorie ne doit pas dépasser 50 caractères"], 
  },
  slug: {
    type: String,
    unique: true, 
    lowercase: true, 
    index: true, 
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", 
    required: true,
  },
}, { timestamps: true });

export const SubCategoryModel = mongoose.model("SubCategory", subCategorySchema);
