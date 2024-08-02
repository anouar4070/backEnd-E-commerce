import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

});

export const createCategoryByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),

});




