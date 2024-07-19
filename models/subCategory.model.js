import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const subCategorySchema = new Schema({
  name: {
    type: String,
    required: [true, "you must enter subCategory name"],
    trim: true,
    minLength: [2, "subCategory name too short"], 
  },
  slug: {
    type: String,
    unique: true, 
    lowercase: true, 
    
  },
  category: {
    type: mongoose.Types.ObjectId,
    required: true,
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