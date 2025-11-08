import type { Request, Response } from 'express';
import { BlogService } from './blog.service.js';
import { ResponseUtil } from '../../shared/utils/response.util.js';
import { asyncHandler } from '../../shared/utils/validation.util.js';
import type { AuthenticatedRequest } from '../../shared/types/common.types.js';

const blogService = new BlogService();

/**
 * Blog controller - handles HTTP requests for blog management
 */
export class BlogController {
  /**
   * Create a new blog post
   */
  createBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const blog = await blogService.createBlog(req.body, req.user.id);
    ResponseUtil.created(res, blog, 'Blog post created successfully');
  });

  /**
   * Get blog by ID
   */
  getBlogById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    ResponseUtil.success(res, blog);
  });

  /**
   * Get blog by slug (public)
   */
  getBlogBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const blog = await blogService.getBlogBySlug(slug);
    ResponseUtil.success(res, blog);
  });

  /**
   * List blogs
   */
  listBlogs = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const result = await blogService.listBlogs(req.query as any, userId);
    ResponseUtil.paginated(res, result.blogs, {
      page: result.page,
      limit: result.limit,
      total: result.total,
    });
  });

  /**
   * Update blog post
   */
  updateBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const { id } = req.params;
    const blog = await blogService.updateBlog(
      id,
      req.body,
      req.user.id,
      req.user.role
    );
    ResponseUtil.success(res, blog, 'Blog post updated successfully');
  });

  /**
   * Delete blog post
   */
  deleteBlog = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const { id } = req.params;
    await blogService.deleteBlog(id, req.user.id, req.user.role);
    ResponseUtil.success(res, null, 'Blog post deleted successfully');
  });
}

