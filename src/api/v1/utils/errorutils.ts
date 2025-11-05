import { AppError } from "../errors/appError";
import { HTTP_STATUS } from "../../../constants/httpstatuscode";

export const formatErrorResponse = (error: unknown) => {
  const timestamp = new Date().toISOString();

  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
      timestamp,
    };
  }

  // For unexpected errors
  return {
    success: false,
    message: "Internal Server Error",
    statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    timestamp,
  };
};
