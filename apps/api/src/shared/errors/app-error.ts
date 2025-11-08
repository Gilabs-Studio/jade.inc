/**
 * Base Application Error Class
 * Custom error classes untuk better error handling
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Validation Error
 * 400 Bad Request
 */
export class ValidationError extends AppError {
  public readonly details?: Record<string, any>;

  constructor(
    message: string = 'Validation failed',
    details?: Record<string, any>
  ) {
    super(message, 400, 'VALIDATION_ERROR', true);
    this.name = 'ValidationError';
    this.details = details;
  }
}

/**
 * Unauthorized Error
 * 401 Unauthorized
 */
export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED', true);
    this.name = 'UnauthorizedError';
  }
}

/**
 * Forbidden Error
 * 403 Forbidden
 */
export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403, 'FORBIDDEN', true);
    this.name = 'ForbiddenError';
  }
}

/**
 * Not Found Error
 * 404 Not Found
 */
export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found', resource?: string) {
    super(message, 404, resource ? `${resource.toUpperCase()}_NOT_FOUND` : 'NOT_FOUND', true);
    this.name = 'NotFoundError';
  }
}

/**
 * Conflict Error
 * 409 Conflict
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Resource conflict', code: string = 'CONFLICT') {
    super(message, 409, code, true);
    this.name = 'ConflictError';
  }
}

/**
 * Internal Server Error
 * 500 Internal Server Error
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500, 'INTERNAL_ERROR', false);
    this.name = 'InternalServerError';
  }
}

