import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Le nom de la sous-catégorie est obligatoire"],
    trim: true,
    minLength: [2, "category name too short"], 
  },
  slug: {
    type: String,
    unique: true, 
    lowercase: true, 
    
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category", 
    
  },
}, { timestamps: true });

export const subCategoryModel = mongoose.model("subCategory", subCategorySchema);


// subCategory = {
// name: "samsung",
// slug: "samsung",
// category: {
//   _id: "155663322114gg200",
//   name: "brand",
//   slug: "brand",
//  },

// }