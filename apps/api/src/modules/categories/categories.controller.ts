import type { Request, Response } from 'express';
import { CategoriesService } from './categories.service.js';
import { ResponseUtil } from '../../shared/utils/response.util.js';
import { asyncHandler } from '../../shared/utils/validation.util.js';

const categoriesService = new CategoriesService();

/**
 * Categories controller - handles HTTP requests for categories
 */
export class CategoriesController {
  /**
   * Create a new category
   */
  createCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoriesService.createCategory(req.body);
    ResponseUtil.created(res, category, 'Category created successfully');
  });

  /**
   * Get category by ID
   */
  getCategoryById = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoriesService.getCategoryById(req.params.id);
    ResponseUtil.success(res, category);
  });

  /**
   * List all categories
   */
  listCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await categoriesService.listCategories();
    ResponseUtil.success(res, categories);
  });

  /**
   * Update category
   */
  updateCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await categoriesService.updateCategory(req.params.id, req.body);
    ResponseUtil.success(res, category, 'Category updated successfully');
  });

  /**
   * Delete category
   */
  deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    await categoriesService.deleteCategory(req.params.id);
    ResponseUtil.success(res, null, 'Category deleted successfully');
  });
}

