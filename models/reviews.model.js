import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  text: {
    type: String,
    required: [true, "Le commentaire est obligatoire"],
    trim: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  rate: {
    type: Number,
    required: [true, "La note est obligatoire"],
    min: 1,
    max: 5,
  },
}, { timestamps: true });

export const ReviewModel = mongoose.model("Review", reviewSchema);
