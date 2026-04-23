import Joi from "joi";

export const categoryIdSchema = Joi.object({
  id: Joi.string().trim().required(),
});

export const createCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().min(3).max(500).required(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().trim().min(3).max(500).optional(),
}).min(1);