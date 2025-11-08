import type { Request, Response } from 'express';
import { UsersService } from './users.service.js';
import { ResponseUtil } from '../../shared/utils/response.util.js';
import { asyncHandler } from '../../shared/utils/validation.util.js';

const usersService = new UsersService();

/**
 * Users controller - handles HTTP requests for user management
 */
export class UsersController {
  /**
   * Create a new user
   */
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body);
    ResponseUtil.created(res, user, 'User created successfully');
  });

  /**
   * Get user by ID
   */
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    ResponseUtil.success(res, user);
  });

  /**
   * List users
   */
  listUsers = asyncHandler(async (req: Request, res: Response) => {
    const result = await usersService.listUsers(req.query as any);
    ResponseUtil.paginated(res, result.users, {
      page: result.page,
      limit: result.limit,
      total: result.total,
    });
  });

  /**
   * Update user
   */
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await usersService.updateUser(id, req.body);
    ResponseUtil.success(res, user, 'User updated successfully');
  });

  /**
   * Delete user
   */
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await usersService.deleteUser(id);
    ResponseUtil.success(res, null, 'User deleted successfully');
  });
}

