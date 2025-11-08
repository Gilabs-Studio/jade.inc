import { Router } from 'express';
import { BlogController } from './blog.controller.js';
import { validate } from '../../shared/middleware/validation.middleware.js';
import { authMiddleware, requireRole } from '../../shared/middleware/auth.middleware.js';
import {
  createBlogSchema,
  updateBlogSchema,
  getBlogSchema,
  getBlogBySlugSchema,
  listBlogsSchema,
  deleteBlogSchema,
} from './blog.types.js';

const router = Router();
const blogController = new BlogController();

/**
 * Blog routes
 */
// Public routes
router.get('/public/:slug', validate(getBlogBySlugSchema), blogController.getBlogBySlug);
router.get('/public', validate(listBlogsSchema), blogController.listBlogs);

// Protected routes (require authentication)
router.use(authMiddleware);

router.post('/', requireRole('admin', 'editor', 'author'), validate(createBlogSchema), blogController.createBlog);
router.get('/', validate(listBlogsSchema), blogController.listBlogs);
router.get('/:id', validate(getBlogSchema), blogController.getBlogById);
router.patch('/:id', requireRole('admin', 'editor', 'author'), validate(updateBlogSchema), blogController.updateBlog);
router.delete('/:id', requireRole('admin', 'editor', 'author'), validate(deleteBlogSchema), blogController.deleteBlog);

export default router;

