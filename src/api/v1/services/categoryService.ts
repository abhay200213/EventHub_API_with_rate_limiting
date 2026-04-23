import {
  createCategoryRepo,
  deleteCategoryByIdRepo,
  getAllCategoriesRepo,
  getCategoryByIdRepo,
  updateCategoryByIdRepo,
} from "../repositories/categoryRepository";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
  Category,
} from "../types/categoryTypes";

export const createCategory = async (
  data: CreateCategoryInput
): Promise<Category> => {
  const now = new Date().toISOString();

  const categoryData: Category = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  return await createCategoryRepo(categoryData);
};

export const getAllCategories = async (): Promise<Category[]> => {
  return await getAllCategoriesRepo();
};

export const getCategoryById = async (
  id: string
): Promise<Category | null> => {
  return await getCategoryByIdRepo(id);
};

export const updateCategoryById = async (
  id: string,
  data: UpdateCategoryInput
): Promise<Category | null> => {
  const existing = await getCategoryByIdRepo(id);

  if (!existing) return null;

  const updatedData: UpdateCategoryInput = {
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return await updateCategoryByIdRepo(id, updatedData);
};

export const deleteCategoryById = async (id: string): Promise<boolean> => {
  const existing = await getCategoryByIdRepo(id);

  if (!existing) return false;

  return await deleteCategoryByIdRepo(id);
};