import type { Request, Response } from 'express';
import { ContentService } from './content.service.js';
import { ResponseUtil } from '../../shared/utils/response.util.js';
import { asyncHandler } from '../../shared/utils/validation.util.js';
import type { AuthenticatedRequest } from '../../shared/types/common.types.js';

const contentService = new ContentService();

/**
 * Content controller - handles HTTP requests for content management
 */
export class ContentController {
  /**
   * Create new content
   */
  createContent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const content = await contentService.createContent(req.body, req.user.id);
    ResponseUtil.created(res, content, 'Content created successfully');
  });

  /**
   * Get content by ID
   */
  getContentById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const content = await contentService.getContentById(id);
    ResponseUtil.success(res, content);
  });

  /**
   * Get content by slug (public)
   */
  getContentBySlug = asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const { type } = req.query;
    const content = await contentService.getContentBySlug(
      slug,
      type as string | undefined
    );
    ResponseUtil.success(res, content);
  });

  /**
   * List content
   */
  listContent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const result = await contentService.listContent(req.query as any, userId);
    ResponseUtil.paginated(res, result.content, {
      page: result.page,
      limit: result.limit,
      total: result.total,
    });
  });

  /**
   * Update content
   */
  updateContent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const { id } = req.params;
    const content = await contentService.updateContent(
      id,
      req.body,
      req.user.id,
      req.user.role
    );
    ResponseUtil.success(res, content, 'Content updated successfully');
  });

  /**
   * Delete content
   */
  deleteContent = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
    if (!req.user) {
      return ResponseUtil.unauthorized(res);
    }

    const { id } = req.params;
    await contentService.deleteContent(id, req.user.id, req.user.role);
    ResponseUtil.success(res, null, 'Content deleted successfully');
  });
}

