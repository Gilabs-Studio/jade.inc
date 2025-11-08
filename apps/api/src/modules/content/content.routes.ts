import { Router } from 'express';
import { ContentController } from './content.controller.js';
import { validate } from '../../shared/middleware/validation.middleware.js';
import { authMiddleware, requireRole } from '../../shared/middleware/auth.middleware.js';
import {
  createContentSchema,
  updateContentSchema,
  getContentSchema,
  getContentBySlugSchema,
  listContentSchema,
  deleteContentSchema,
} from './content.types.js';

const router = Router();
const contentController = new ContentController();

/**
 * Content Management routes
 */
// Public routes
router.get('/public/:slug', validate(getContentBySlugSchema), contentController.getContentBySlug);
router.get('/public', validate(listContentSchema), contentController.listContent);

// Protected routes (require authentication)
router.use(authMiddleware);

router.post('/', requireRole('admin', 'editor', 'author'), validate(createContentSchema), contentController.createContent);
router.get('/', validate(listContentSchema), contentController.listContent);
router.get('/:id', validate(getContentSchema), contentController.getContentById);
router.patch('/:id', requireRole('admin', 'editor', 'author'), validate(updateContentSchema), contentController.updateContent);
router.delete('/:id', requireRole('admin', 'editor', 'author'), validate(deleteContentSchema), contentController.deleteContent);

export default router;

