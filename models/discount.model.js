import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const discountSchema = new Schema({
  name: {
    type: String,
    required: [true, "Le nom de la remise est obligatoire"],
    trim: true,
    maxlength: [50, "Le nom de la remise ne doit pas dépasser 50 caractères"],
  },
  type: {
    type: String, 
    enum: ["percentage", "fixed"],
    required: true,
  },
  value: {
    type: Number,
    required: [true, "La valeur de la remise est obligatoire"],
    min: [0, "La valeur de la remise ne peut pas être négative"],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const DiscountModel = mongoose.model("Discount", discountSchema);
