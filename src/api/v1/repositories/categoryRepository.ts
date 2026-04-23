import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../../../../config/firebaseConfig";
import { Category, UpdateCategoryInput } from "../types/categoryTypes";

const categoryCollection = db.collection("categories");

export const createCategoryRepo = async (
  data: Category
): Promise<Category> => {
  const docRef = await categoryCollection.add(data);

  return {
    id: docRef.id,
    ...data,
  };
};

export const getAllCategoriesRepo = async (): Promise<Category[]> => {
  const snapshot = await categoryCollection.get();

  return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...(doc.data() as Omit<Category, "id">),
  }));
};

export const getCategoryByIdRepo = async (
  id: string
): Promise<Category | null> => {
  const doc = await categoryCollection.doc(id).get();

  if (!doc.exists) {
    return null;
  }

  return {
    id: doc.id,
    ...(doc.data() as Omit<Category, "id">),
  };
};

export const updateCategoryByIdRepo = async (
  id: string,
  data: UpdateCategoryInput
): Promise<Category | null> => {
  const docRef = categoryCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return null;
  }

  await docRef.update(data as Record<string, unknown>);

  const updatedDoc = await docRef.get();

  return {
    id: updatedDoc.id,
    ...(updatedDoc.data() as Omit<Category, "id">),
  };
};

export const deleteCategoryByIdRepo = async (
  id: string
): Promise<boolean> => {
  const docRef = categoryCollection.doc(id);
  const existingDoc = await docRef.get();

  if (!existingDoc.exists) {
    return false;
  }

  await docRef.delete();
  return true;
};