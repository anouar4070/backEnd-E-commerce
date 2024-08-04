import Joi from "joi";

export const createProductSchema = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  price: Joi.number().positive().required(), 
  priceAfterDiscount: Joi.number().positive().allow(null), // Allow null if no discount
  ratingAvg: Joi.number().min(0).max(5), 
  ratingCount: Joi.number().min(0), 
  description: Joi.string().required(),
  quantity: Joi.number().min(0), 
  sold: Joi.number().min(0), 
  category: Joi.string().hex().length(24).required(),
  subCategory: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required()
});

export const updateProductSchema = Joi.object({
  title: Joi.string().min(3).max(30),
  price: Joi.number().positive(),
  priceAfterDiscount: Joi.number().positive().allow(null),
  ratingAvg: Joi.number().min(0).max(5),
  ratingCount: Joi.number().min(0),
  description: Joi.string(),
  quantity: Joi.number().min(0),
  sold: Joi.number().min(0),
  category: Joi.string(),
  subCategory: Joi.string(),
  brand: Joi.string(),
  id: Joi.string().hex().length(24).required()
});

export const deleteProductSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});