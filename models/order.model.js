import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Ensure at least one item per product
      },
      price: { // Store the product price at the time of order
        type: Number,
        required: true,
      },
    },
  ],
  shippingAddress: {
    type: {
      type: String,
      default: "address",
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "failed"],
  },
  shippingStatus: {
    type: String,
    default: "pending",
    enum: ["pending", "shipped", "delivered", "cancelled"],
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  deliveredAt: {
    type: Date,
  },
}, { timestamps: true });

export const OrderModel = model("Order", orderSchema);
