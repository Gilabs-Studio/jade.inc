import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { ResponseUtil } from '../../shared/utils/response.util.js';
import { asyncHandler } from '../../shared/utils/validation.util.js';

const authService = new AuthService();

/**
 * Auth controller - handles HTTP requests for authentication
 */
export class AuthController {
  /**
   * Register a new user
   */
  register = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.register(req.body);
    ResponseUtil.created(res, result, 'User registered successfully');
  });

  /**
   * Login user
   */
  login = asyncHandler(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    ResponseUtil.success(res, result, 'Login successful');
  });

  /**
   * Refresh access token
   */
  refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    const result = await authService.refreshToken(refreshToken);
    ResponseUtil.success(res, result, 'Token refreshed successfully');
  });

  /**
   * Logout user
   */
  logout = asyncHandler(async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.substring(7);

    if (!token) {
      return ResponseUtil.unauthorized(res, 'No token provided');
    }

    await authService.logout(token);
    ResponseUtil.success(res, null, 'Logout successful');
  });
}

