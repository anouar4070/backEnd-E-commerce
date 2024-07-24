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
    slug: {
      type: String,
    required: true,
      lowercase: true, // Convert slug to lowercase for consistency
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
    ratingAvg: {
      type: Number,
      min: [1, "rating average must be greater then 1"],
      max: [5, "rating average must be less then 5"],
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    description: {
      type: String,
      minLength: [5, "description is too short"],
      maxLength: [300, "description is too long"],
      required: [true, "description is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
      required: [true, "product quantity is required"],
    },
    sold: {
      type: Number,
      default: 0,
      min: 0,
    },
    
    imgCover: String,
    images: {
      type: [String], // Array of image URLs
      // trim: true,
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
       required: true,
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
       required: [true, "you must enter brand"],
    },
   
    // createdBy: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "User", 
    // },
 
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
