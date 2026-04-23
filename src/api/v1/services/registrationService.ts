import {
  createRegistrationRepo,
  deleteRegistrationByIdRepo,
  getAllRegistrationsRepo,
  getRegistrationByIdRepo,
  updateRegistrationByIdRepo,
} from "../repositories/registrationRepository";
import {
  CreateRegistrationInput,
  UpdateRegistrationInput,
  Registration,
} from "../types/registrationTypes";

export const createRegistration = async (
  data: CreateRegistrationInput
): Promise<Registration> => {
  const now = new Date().toISOString();

  const registrationData: Registration = {
    ...data,
    status: data.status || "registered",
    registeredAt: now,
    updatedAt: now,
  };

  return await createRegistrationRepo(registrationData);
};

export const getAllRegistrations = async (): Promise<Registration[]> => {
  return await getAllRegistrationsRepo();
};

export const getRegistrationById = async (
  id: string
): Promise<Registration | null> => {
  return await getRegistrationByIdRepo(id);
};

export const updateRegistrationById = async (
  id: string,
  data: UpdateRegistrationInput
): Promise<Registration | null> => {
  const existing = await getRegistrationByIdRepo(id);

  if (!existing) return null;

  const updatedData: UpdateRegistrationInput = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return await updateRegistrationByIdRepo(id, updatedData);
};

export const deleteRegistrationById = async (
  id: string
): Promise<boolean> => {
  const existing = await getRegistrationByIdRepo(id);

  if (!existing) return false;

  return await deleteRegistrationByIdRepo(id);
};