import { Request, Response, NextFunction } from "express";
import { formatErrorResponse } from "../utils/errorutils";
import { AppError } from "../errors/appError";
import { HTTP_STATUS } from "../../../constants/httpstatuscode";

export default function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const errorResponse = formatErrorResponse(err);

  // Log all errors (more advanced logging can be added later)
  if (err instanceof AppError) {
    console.error(`[${new Date().toISOString()}] [AppError] ${err.message}`);
  } else {
    console.error(`[${new Date().toISOString()}] [UnhandledError]`, err);
  }

  res.status((err instanceof AppError) ? err.statusCode : HTTP_STATUS.INTERNAL_SERVER_ERROR)
     .json(errorResponse);
}
