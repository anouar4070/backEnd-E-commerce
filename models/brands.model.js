import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const brandSchema = new Schema({
  name: {
    type: String,
    required: [true, "you must enter brand name"],
    trim: true,
    minlength: [3, "Brand name too short"],  
    unique: true, 
  },
  slug:{
type: String,
lowercase: true,
  },
  logo: String,
   

}, { timestamps: true }); 

  // Construct the Brand Logo URL:
brandSchema.post("init", (doc) => {
  console.log(doc);
  doc.logo = process.env.BASE_URL+"brand/"+ doc.logo;
});

export const BrandModel = mongoose.model("brand", brandSchema);
