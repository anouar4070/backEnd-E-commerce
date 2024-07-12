import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const couponSchema = new Schema({
  code: {
    type: String,
    required: [true, "Le code du coupon est obligatoire"],
    trim: true,
    uppercase: true, 
    unique: true,
  },
  expires: {
    type: Date,
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Discount", 
    required: true,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export const CouponModel = mongoose.model("Coupon", couponSchema);
