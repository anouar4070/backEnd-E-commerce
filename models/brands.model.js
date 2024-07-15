import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    required: [true, "Le nom de la marque est obligatoire"],
    trim: true,
    minlength: [3, "Brand name too short"],  
    unique: true, 
  },
  logo: String,
   

}, { timestamps: true }); 

export const BrandModel = mongoose.model("brand", brandSchema);
