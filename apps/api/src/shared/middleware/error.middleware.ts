import type { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../utils/response.util.js';
import { env } from '../../config/env.js';
import {
  AppError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
} from '../errors/app-error.js';

/**
 * Global error handling middleware
 */
export function errorMiddleware(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Log error
  if (env.NODE_ENV === 'development') {
    console.error('Error:', {
      name: err.name,
      message: err.message,
      stack: err.stack,
      url: req.originalUrl,
      method: req.method,
    });
  } else {
    // Production logging (should use structured logger)
    console.error('Error:', {
      name: err.name,
      message: err.message,
      url: req.originalUrl,
      method: req.method,
    });
  }

  // Handle AppError instances
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        code: err.code,
        details: err instanceof ValidationError ? err.details : undefined,
      },
    });
  }

  // Handle known error types (legacy support)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: err.message,
      error: {
        code: 'VALIDATION_ERROR',
      },
    });
  }

  if (err.name === 'UnauthorizedError') {
    return ResponseUtil.unauthorized(res, err.message);
  }

  if (err.name === 'ForbiddenError') {
    return ResponseUtil.forbidden(res, err.message);
  }

  if (err.name === 'NotFoundError') {
    return ResponseUtil.notFound(res, err.message);
  }

  // Default to 500 server error
  ResponseUtil.serverError(
    res,
    env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  );
}

/**
 * 404 Not Found handler
 */
export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  ResponseUtil.notFound(res, `Route ${req.originalUrl} not found`);
}

