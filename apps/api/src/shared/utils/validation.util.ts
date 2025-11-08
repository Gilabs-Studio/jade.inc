import { z } from 'zod';
import type { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from './response.util.js';

/**
 * Validation middleware using Zod schemas
 */
export function validate<T extends z.ZodTypeAny>(
  schema: T
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body, query, and params
      const data = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      schema.parse(data);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        return ResponseUtil.error(
          res,
          'Validation failed',
          400,
          'VALIDATION_ERROR',
          { fields: errors }
        );
      }

      return ResponseUtil.serverError(res, 'Validation error');
    }
  };
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

