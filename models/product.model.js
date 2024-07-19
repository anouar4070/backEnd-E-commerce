import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "you must enter title"],
      trim: true,
      minlength: [3, "too short product title"], 
    },
    imgCover: {
      type: String,
      required: [true, "you must enter cover image"],
      trim: true,
    },
    images: {
      type: [String], // Array of image URLs
      trim: true,
    },
    description: {
      type: String,
      required: [true, "you must enter description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "you must enter price"],
      min: [0, "the price can't be negative"],
    },
    priceAfterDiscount: {
      type: Number,
      default: 0, 
    },
    discount: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "discount", 
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "you must enter category"],
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: [true, "you must enter brand"],
    },
    slug: {
      type: String,
      unique: true, 
      lowercase: true, // Convert slug to lowercase for consistency
     
    },
    ratingAvg: {
      type: Number,
      default: 0,
    },
    rateCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
    stock: {
      type: Number,
      required: [true, "you must enter stock"],
      min: [0, "stock can't be negative number"],
    },
    soldItem: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
