import Joi from "joi";

const statusValues = ["active", "cancelled", "completed"] as const;

/**
 * @openapi
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "abc123"
 *         name:
 *           type: string
 *           example: "Backend Capstone Demo"
 *         description:
 *           type: string
 *           example: "Initial milestone event for EventHub API"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-05-10T18:00:00.000Z"
 *         location:
 *           type: string
 *           example: "Winnipeg"
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           example: 100
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           example: 0
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: "active"
 *         categoryId:
 *           type: string
 *           example: "cat123"
 *         createdBy:
 *           type: string
 *           example: "user123"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-23T16:02:38.793Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-23T16:02:38.793Z"
 *
 *     CreateEventInput:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - date
 *         - location
 *         - capacity
 *         - status
 *         - categoryId
 *         - createdBy
 *       properties:
 *         name:
 *           type: string
 *           example: "Backend Capstone Demo"
 *         description:
 *           type: string
 *           example: "Initial milestone event for EventHub API"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-05-10T18:00:00.000Z"
 *         location:
 *           type: string
 *           example: "Winnipeg"
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           example: 100
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: "active"
 *         categoryId:
 *           type: string
 *           example: "cat123"
 *         createdBy:
 *           type: string
 *           example: "user123"
 *
 *     UpdateEventInput:
 *       type: object
 *       minProperties: 1
 *       properties:
 *         name:
 *           type: string
 *           example: "Updated Backend Demo"
 *         description:
 *           type: string
 *           example: "Updated milestone event"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-05-11T18:00:00.000Z"
 *         location:
 *           type: string
 *           example: "RRC Polytech"
 *         capacity:
 *           type: integer
 *           minimum: 1
 *           example: 120
 *         registrationCount:
 *           type: integer
 *           minimum: 0
 *           example: 0
 *         status:
 *           type: string
 *           enum: [active, cancelled, completed]
 *           example: "active"
 *         categoryId:
 *           type: string
 *           example: "cat123"
 *
 *     ValidationError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Validation error"
 *         errors:
 *           type: array
 *           items:
 *             type: string
 */

export const createEventSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().min(3).max(500).required(),
  date: Joi.date().iso().required(),
  location: Joi.string().trim().min(2).max(100).required(),
  capacity: Joi.number().integer().min(1).required(),
  status: Joi.string()
    .valid(...statusValues)
    .required(),
  categoryId: Joi.string().trim().required(),
  createdBy: Joi.string().trim().required(),
});

export const updateEventSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().trim().min(3).max(500).optional(),
  date: Joi.date().iso().optional(),
  location: Joi.string().trim().min(2).max(100).optional(),
  capacity: Joi.number().integer().min(1).optional(),
  registrationCount: Joi.number().integer().min(0).optional(),
  status: Joi.string()
    .valid(...statusValues)
    .optional(),
  categoryId: Joi.string().trim().optional(),
}).min(1);

export const eventIdSchema = Joi.object({
  id: Joi.string().trim().required(),
});