import { Router } from 'express';
import { CategoriesController } from './categories.controller.js';
import { validate } from '../../shared/middleware/validation.middleware.js';
import { authMiddleware, requireAdmin } from '../../shared/middleware/auth.middleware.js';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
  deleteCategorySchema,
} from './categories.types.js';

const router = Router();
const categoriesController = new CategoriesController();

/**
 * Categories routes
 */
// Public routes
router.get('/', categoriesController.listCategories);

// Protected routes (require authentication)
router.use(authMiddleware);

// Admin only routes
router.post('/', requireAdmin, validate(createCategorySchema), categoriesController.createCategory);
router.get('/:id', validate(getCategorySchema), categoriesController.getCategoryById);
router.patch('/:id', requireAdmin, validate(updateCategorySchema), categoriesController.updateCategory);
router.delete('/:id', requireAdmin, validate(deleteCategorySchema), categoriesController.deleteCategory);

export default router;

