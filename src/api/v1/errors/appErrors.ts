import { HTTP_STATUS, HttpStatusCode } from "../../../constants/httpstatuscode";

/**
 * Base application error class for standardized error handling.
 */
export class AppError extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: HttpStatusCode, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 400 - Bad Request
 */
export class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

/**
 * 401 - Unauthorized
 */
export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized Access") {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

/**
 * 403 - Forbidden
 */
export class ForbiddenError extends AppError {
  constructor(message = "Forbidden Access") {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

/**
 * 404 - Not Found
 */
export class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}