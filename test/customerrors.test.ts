import {AppError,BadRequestError,UnauthorizedError,ForbiddenError,NotFoundError,} from "../src/api/v1/errors/appErrors";
import { HTTP_STATUS } from "../src/constants/httpstatuscode";

describe("Custom Error Classes", () => {
  test("BadRequestError should set correct status and message", () => {
    const err = new BadRequestError("Invalid input");
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(err.message).toBe("Invalid input");
  });

  test("UnauthorizedError should set correct status and default message", () => {
    const err = new UnauthorizedError();
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
    expect(err.message).toBe("Unauthorized Access");
  });

  test("ForbiddenError should set correct status and message", () => {
    const err = new ForbiddenError("Access denied");
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(HTTP_STATUS.FORBIDDEN);
    expect(err.message).toBe("Access denied");
  });

  test("NotFoundError should set correct status and default message", () => {
    const err = new NotFoundError();
    expect(err).toBeInstanceOf(AppError);
    expect(err.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
    expect(err.message).toBe("Resorce Not Found"); // match your current typo
  });

  test("AppError should store provided details correctly", () => {
    const err = new AppError("General failure", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(err.message).toBe("General failure");
    expect(err.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(err.isOperational).toBe(true);
  });
});
