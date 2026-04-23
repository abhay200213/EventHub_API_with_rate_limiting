import { Request, Response, NextFunction } from "express";
import {
  createRegistration,
  deleteRegistrationById,
  getAllRegistrations,
  getRegistrationById,
  updateRegistrationById,
} from "../services/registrationService";

export const createRegistrationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const registration = await createRegistration(req.body);

    res.status(201).json({
      message: "Registration created",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRegistrationsHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const registrations = await getAllRegistrations();

    res.status(200).json({
      message: "Registrations retrieved",
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    next(error);
  }
};

export const getRegistrationByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const registration = await getRegistrationById(id);

    if (!registration) {
      res.status(404).json({
        message: "Registration not found",
      });
      return;
    }

    res.status(200).json({
      message: "Registration retrieved",
      data: registration,
    });
  } catch (error) {
    next(error);
  }
};

export const updateRegistrationByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const updatedRegistration = await updateRegistrationById(id, req.body);

    if (!updatedRegistration) {
      res.status(404).json({
        message: "Registration not found",
      });
      return;
    }

    res.status(200).json({
      message: "Registration updated",
      data: updatedRegistration,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRegistrationByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const deleted = await deleteRegistrationById(id);

    if (!deleted) {
      res.status(404).json({
        message: "Registration not found",
      });
      return;
    }

    res.status(200).json({
      message: "Registration deleted",
    });
  } catch (error) {
    next(error);
  }
};