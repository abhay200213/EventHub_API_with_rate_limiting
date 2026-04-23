import { Router, Request, Response, NextFunction } from "express";
import { ValidationErrorItem } from "joi";
import {
  createRegistrationHandler,
  deleteRegistrationByIdHandler,
  getAllRegistrationsHandler,
  getRegistrationByIdHandler,
  updateRegistrationByIdHandler,
} from "../controllers/registrationController";
import { validateRequest } from "../middleware/validateRequest";
import {
  createRegistrationSchema,
  registrationIdSchema,
  updateRegistrationSchema,
} from "../validation/registrationValidation";

const router = Router();

const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = registrationIdSchema.validate(req.params, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({
      message: "Validation error",
      errors: error.details.map(
        (detail: ValidationErrorItem) => detail.message
      ),
    });
    return;
  }

  next();
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "reg123"
 *         eventId:
 *           type: string
 *           example: "event123"
 *         userId:
 *           type: string
 *           example: "user123"
 *         status:
 *           type: string
 *           example: "registered"
 *         registeredAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-23T14:45:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-23T14:45:00.000Z"
 *
 *     CreateRegistrationInput:
 *       type: object
 *       required:
 *         - eventId
 *         - userId
 *       properties:
 *         eventId:
 *           type: string
 *           example: "event123"
 *         userId:
 *           type: string
 *           example: "user123"
 *         status:
 *           type: string
 *           example: "registered"
 *
 *     UpdateRegistrationInput:
 *       type: object
 *       properties:
 *         eventId:
 *           type: string
 *           example: "event456"
 *         userId:
 *           type: string
 *           example: "user456"
 *         status:
 *           type: string
 *           example: "cancelled"
 *
 *     RegistrationResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Registration retrieved"
 *         data:
 *           $ref: '#/components/schemas/Registration'
 *
 *     RegistrationListResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Registrations retrieved"
 *         count:
 *           type: integer
 *           example: 2
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Registration'
 *
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Registration deleted"
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
 *
 *     NotFoundError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Registration not found"
 *
 *     ServerError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Failed to retrieve registrations"
 */

/**
 * @openapi
 * /api/v1/registrations:
 *   post:
 *     summary: Create a new registration
 *     tags:
 *       - Registrations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRegistrationInput'
 *     responses:
 *       201:
 *         description: Registration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.post(
  "/",
  validateRequest(createRegistrationSchema),
  createRegistrationHandler
);

/**
 * @openapi
 * /api/v1/registrations:
 *   get:
 *     summary: Get all registrations
 *     tags:
 *       - Registrations
 *     responses:
 *       200:
 *         description: Registrations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationListResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get("/", getAllRegistrationsHandler);

/**
 * @openapi
 * /api/v1/registrations/{id}:
 *   get:
 *     summary: Get a registration by ID
 *     tags:
 *       - Registrations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "reg123"
 *     responses:
 *       200:
 *         description: Registration retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationResponse'
 *       400:
 *         description: Invalid registration ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Registration not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.get("/:id", validateIdParam, getRegistrationByIdHandler);

/**
 * @openapi
 * /api/v1/registrations/{id}:
 *   put:
 *     summary: Update a registration by ID
 *     tags:
 *       - Registrations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "reg123"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRegistrationInput'
 *     responses:
 *       200:
 *         description: Registration updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegistrationResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Registration not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.put(
  "/:id",
  validateIdParam,
  validateRequest(updateRegistrationSchema),
  updateRegistrationByIdHandler
);

/**
 * @openapi
 * /api/v1/registrations/{id}:
 *   delete:
 *     summary: Delete a registration by ID
 *     tags:
 *       - Registrations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "reg123"
 *     responses:
 *       200:
 *         description: Registration deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       400:
 *         description: Invalid registration ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidationError'
 *       404:
 *         description: Registration not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NotFoundError'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ServerError'
 */
router.delete("/:id", validateIdParam, deleteRegistrationByIdHandler);

export default router;