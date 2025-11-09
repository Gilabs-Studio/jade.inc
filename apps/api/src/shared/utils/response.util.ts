import type { Response } from 'express';
import type { ApiResponse } from '../types/common.types.js';

/**
 * Standardized API response utility
 */
export class ResponseUtil {
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200
  ): Response<ApiResponse<T>> {
    return res.status(statusCode).json({
      success: true,
      data,
      message,
    });
  }

  static error(
    res: Response,
    message: string,
    statusCode: number = 400,
    errorCode?: string,
    details?: Record<string, any>
  ): Response<ApiResponse> {
    return res.status(statusCode).json({
      success: false,
      message,
      error: errorCode
        ? {
            code: errorCode,
            ...(details && { details }),
          }
        : undefined,
    });
  }

  static paginated<T>(
    res: Response,
    data: T[],
    meta: {
      page: number;
      limit: number;
      total: number;
    },
    message?: string
  ): Response<ApiResponse<T[]>> {
    const totalPages = Math.ceil(meta.total / meta.limit);

    return res.status(200).json({
      success: true,
      data,
      message,
      meta: {
        page: meta.page,
        limit: meta.limit,
        total: meta.total,
        totalPages,
      },
    });
  }

  static created<T>(
    res: Response,
    data: T,
    message?: string
  ): Response<ApiResponse<T>> {
    return this.success(res, data, message, 201);
  }

  static noContent(res: Response): Response {
    return res.status(204).send();
  }

  static badRequest(
    res: Response,
    message: string,
    errorCode?: string
  ): Response<ApiResponse> {
    return this.error(res, message, 400, errorCode);
  }

  static unauthorized(
    res: Response,
    message: string = 'Unauthorized'
  ): Response<ApiResponse> {
    return this.error(res, message, 401, 'UNAUTHORIZED');
  }

  static forbidden(
    res: Response,
    message: string = 'Forbidden'
  ): Response<ApiResponse> {
    return this.error(res, message, 403, 'FORBIDDEN');
  }

  static notFound(
    res: Response,
    message: string = 'Resource not found'
  ): Response<ApiResponse> {
    return this.error(res, message, 404, 'NOT_FOUND');
  }

  static serverError(
    res: Response,
    message: string = 'Internal server error'
  ): Response<ApiResponse> {
    return this.error(res, message, 500, 'INTERNAL_ERROR');
  }
}

