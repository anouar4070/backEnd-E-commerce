import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre du produit est obligatoire"],
      trim: true,
      maxlength: [100, "Le titre du produit ne doit pas dépasser 100 caractères"], 
    },
    imgCover: {
      type: String,
      required: [true, "L'image de couverture du produit est obligatoire"],
      trim: true,
    },
    images: {
      type: [String], // Array of image URLs
      trim: true,
    },
    description: {
      type: String,
      required: [true, "La description du produit est obligatoire"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Le prix du produit est obligatoire"],
      min: [0, "Le prix du produit ne peut pas être négatif"],
    },
    priceAfterDiscount: {
      type: Number,
      default: 0, 
    },
    discount: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount", 
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "La catégorie du produit est obligatoire"],
    },
    subcategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "La marque du produit est obligatoire"],
    },
    slug: {
      type: String,
      unique: true, 
      lowercase: true, // Convert slug to lowercase for consistency
      index: true, 
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
      required: [true, "Le stock du produit est obligatoire"],
      min: [0, "Le stock du produit ne peut pas être négatif"],
    },
    soldItem: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", productSchema);
