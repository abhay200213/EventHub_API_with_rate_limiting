import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../src/api/v1/services/categoryService";

import {
  createCategoryRepo,
  deleteCategoryByIdRepo,
  getAllCategoriesRepo,
  getCategoryByIdRepo,
  updateCategoryByIdRepo,
} from "../src/api/v1/repositories/categoryRepository";

jest.mock("../src/api/v1/repositories/categoryRepository", () => ({
  createCategoryRepo: jest.fn(),
  getAllCategoriesRepo: jest.fn(),
  getCategoryByIdRepo: jest.fn(),
  updateCategoryByIdRepo: jest.fn(),
  deleteCategoryByIdRepo: jest.fn(),
}));

describe("categoryService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createCategory", () => {
    it("should create a category with createdAt and updatedAt", async () => {
      const input = {
        name: "Tech",
        description: "Technology events",
      };

      (createCategoryRepo as jest.Mock).mockImplementation(async (categoryData) => ({
        id: "cat123",
        ...categoryData,
      }));

      const result = await createCategory(input);

      expect(createCategoryRepo).toHaveBeenCalledTimes(1);
      expect(createCategoryRepo).toHaveBeenCalledWith(
        expect.objectContaining({
          ...input,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );

      expect(result).toEqual(
        expect.objectContaining({
          id: "cat123",
          ...input,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });
  });

  describe("getAllCategories", () => {
    it("should return all categories", async () => {
      const mockCategories = [
        {
          id: "cat1",
          name: "Tech",
          description: "Technology events",
          createdAt: "2026-04-23T10:00:00.000Z",
          updatedAt: "2026-04-23T10:00:00.000Z",
        },
      ];

      (getAllCategoriesRepo as jest.Mock).mockResolvedValue(mockCategories);

      const result = await getAllCategories();

      expect(getAllCategoriesRepo).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCategories);
    });
  });

  describe("getCategoryById", () => {
    it("should return a category when found", async () => {
      const mockCategory = {
        id: "cat1",
        name: "Tech",
        description: "Technology events",
        createdAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      (getCategoryByIdRepo as jest.Mock).mockResolvedValue(mockCategory);

      const result = await getCategoryById("cat1");

      expect(getCategoryByIdRepo).toHaveBeenCalledWith("cat1");
      expect(result).toEqual(mockCategory);
    });

    it("should return null when category is not found", async () => {
      (getCategoryByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await getCategoryById("missing-id");

      expect(getCategoryByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(result).toBeNull();
    });
  });

  describe("updateCategoryById", () => {
    it("should update and return the category when it exists", async () => {
      const existingCategory = {
        id: "cat1",
        name: "Tech",
        description: "Technology events",
        createdAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      const updates = {
        name: "Business",
        description: "Business and networking events",
      };

      const updatedCategory = {
        ...existingCategory,
        ...updates,
        updatedAt: "2026-04-23T12:00:00.000Z",
      };

      (getCategoryByIdRepo as jest.Mock).mockResolvedValue(existingCategory);
      (updateCategoryByIdRepo as jest.Mock).mockResolvedValue(updatedCategory);

      const result = await updateCategoryById("cat1", updates);

      expect(getCategoryByIdRepo).toHaveBeenCalledWith("cat1");
      expect(updateCategoryByIdRepo).toHaveBeenCalledTimes(1);
      expect(updateCategoryByIdRepo).toHaveBeenCalledWith(
        "cat1",
        expect.objectContaining({
          ...updates,
          updatedAt: expect.any(String),
        })
      );
      expect(result).toEqual(updatedCategory);
    });

    it("should return null when trying to update a non-existing category", async () => {
      (getCategoryByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await updateCategoryById("missing-id", {
        name: "Business",
      });

      expect(getCategoryByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(updateCategoryByIdRepo).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });
  });

  describe("deleteCategoryById", () => {
    it("should delete and return true when category exists", async () => {
      const existingCategory = {
        id: "cat1",
        name: "Tech",
        description: "Technology events",
        createdAt: "2026-04-23T10:00:00.000Z",
        updatedAt: "2026-04-23T10:00:00.000Z",
      };

      (getCategoryByIdRepo as jest.Mock).mockResolvedValue(existingCategory);
      (deleteCategoryByIdRepo as jest.Mock).mockResolvedValue(true);

      const result = await deleteCategoryById("cat1");

      expect(getCategoryByIdRepo).toHaveBeenCalledWith("cat1");
      expect(deleteCategoryByIdRepo).toHaveBeenCalledWith("cat1");
      expect(result).toBe(true);
    });

    it("should return false when trying to delete a non-existing category", async () => {
      (getCategoryByIdRepo as jest.Mock).mockResolvedValue(null);

      const result = await deleteCategoryById("missing-id");

      expect(getCategoryByIdRepo).toHaveBeenCalledWith("missing-id");
      expect(deleteCategoryByIdRepo).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});