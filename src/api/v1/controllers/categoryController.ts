import { Request, Response, NextFunction } from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../services/categoryService";

export const createCategoryHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await createCategory(req.body);

    res.status(201).json({
      message: "Category created",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCategoriesHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await getAllCategories();

    res.status(200).json({
      message: "Categories retrieved",
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const category = await getCategoryById(id);

    if (!category) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      message: "Category retrieved",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategoryByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const updatedCategory = await updateCategoryById(id, req.body);

    if (!updatedCategory) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      message: "Category updated",
      data: updatedCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategoryByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const deleted = await deleteCategoryById(id);

    if (!deleted) {
      res.status(404).json({
        message: "Category not found",
      });
      return;
    }

    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    next(error);
  }
};