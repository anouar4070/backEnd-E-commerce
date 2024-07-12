import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    required: [true, "Le nom de la marque est obligatoire"],
    trim: true,
    maxlength: [50, "Le nom de la marque ne doit pas dépasser 50 caractères"], // 
    unique: true, 
  },
  logo: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    unique: true, 
    lowercase: true, 
    index: true, 
  },
}, { timestamps: true }); 

export const BrandModel = mongoose.model("Brand", brandSchema);
