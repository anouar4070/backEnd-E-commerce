import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", 
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure at least one item per product
      },
    },
  ],
}, { timestamps: true });

export const CartModel = model("Cart", cartSchema);
