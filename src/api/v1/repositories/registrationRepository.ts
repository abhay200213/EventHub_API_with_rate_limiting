import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../../../../config/firebaseConfig";
import {
  Registration,
  UpdateRegistrationInput,
} from "../types/registrationTypes";

const registrationCollection = db.collection("registrations");

export const createRegistrationRepo = async (
  data: Registration
): Promise<Registration> => {
  const docRef = await registrationCollection.add(data);

  return {
    id: docRef.id,
    ...data,
  };
};

export const getAllRegistrationsRepo = async (): Promise<Registration[]> => {
  const snapshot = await registrationCollection.get();

  return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...(doc.data() as Omit<Registration, "id">),
  }));
};

export const getRegistrationByIdRepo = async (
  id: string
): Promise<Registration | null> => {
  const doc = await registrationCollection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...(doc.data() as Omit<Registration, "id">),
  };
};

export const updateRegistrationByIdRepo = async (
  id: string,
  data: UpdateRegistrationInput
): Promise<Registration | null> => {
  const docRef = registrationCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return null;
  }

  await docRef.update(data as Record<string, unknown>);

  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...(updatedDoc.data() as Omit<Registration, "id">),
  };
};

export const deleteRegistrationByIdRepo = async (
  id: string
): Promise<boolean> => {
  const docRef = registrationCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};