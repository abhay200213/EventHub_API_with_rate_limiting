import Joi from "joi";

export const registrationIdSchema = Joi.object({
  id: Joi.string().trim().required(),
});

export const createRegistrationSchema = Joi.object({
  eventId: Joi.string().trim().required(),
  userId: Joi.string().trim().required(),
  status: Joi.string().valid("registered", "cancelled").optional(),
});

export const updateRegistrationSchema = Joi.object({
  eventId: Joi.string().trim().optional(),
  userId: Joi.string().trim().optional(),
  status: Joi.string().valid("registered", "cancelled").optional(),
}).min(1);