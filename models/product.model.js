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
    imgCover: String,
    images: {
      type: [String], // Array of image URLs
      // trim: true,
    },
    description: {
      type: String,
      // required: [true, "you must enter description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "you must enter price"],
      min: [0, "the price can't be negative"],
    },
    priceAfterDiscount: {
      type: Number,
      min: 0, 
    },
    // discount: { 
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "discount", 
    // },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: [true, "you must enter category"],
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "SubCategory",
      // required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
      // required: [true, "you must enter brand"],
    },
    slug: {
      type: String,
    required: true,
      lowercase: true, // Convert slug to lowercase for consistency
     
    },
    ratingAvg: {
      type: Number,
      min: 1,
    },
    rateCount: {
      type: Number,
      min: 1,
    },
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User", 
    // },
    // stock: {
    //   type: Number,
    //   required: [true, "you must enter stock"],
    //   min: [0, "stock can't be negative number"],
    // },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
