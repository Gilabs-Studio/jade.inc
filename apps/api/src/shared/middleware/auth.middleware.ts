import type { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../../config/supabase.js';
import { ResponseUtil } from '../utils/response.util.js';
import { UnauthorizedError, NotFoundError } from '../errors/app-error.js';
import type { AuthenticatedRequest } from '../types/common.types.js';

/**
 * Middleware to authenticate requests using Supabase JWT
 */
export async function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      ResponseUtil.unauthorized(res, 'No token provided');
      return;
    }

    const token = authHeader.substring(7);

    // Verify token with Supabase
    const {
      data: { user },
      error,
    } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedError('Invalid or expired token');
    }

    // Get user role from database
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, role')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      throw new NotFoundError('User not found', 'USER');
    }

    // Attach user to request
    req.user = {
      id: userData.id,
      email: userData.email,
      role: userData.role,
    };

    next();
  } catch (error) {
    // Let error middleware handle it
    next(error);
  }
}

/**
 * Middleware to check if user has required role(s)
 */
export function requireRole(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      ResponseUtil.unauthorized(res, 'Authentication required');
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      ResponseUtil.forbidden(res, 'Insufficient permissions');
      return;
    }

    next();
  };
}

/**
 * Middleware to check if user is admin
 */
export const requireAdmin = requireRole('admin');

