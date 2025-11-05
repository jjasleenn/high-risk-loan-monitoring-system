// test/errorHandler.test.ts
import { formatErrorResponse } from "../src/api/v1/utils/errorutils";
import { AppError } from "../src/api/v1/errors/appErrors";
import { HTTP_STATUS } from "../src/constants/httpstatuscode";

test("formats AppError correctly", () => {
  const error = new AppError("Bad Request", HTTP_STATUS.BAD_REQUEST);
  const result = formatErrorResponse(error);
  expect(result).toMatchObject({
    success: false,
    message: "Bad Request",
    statusCode: 400,
  });
});
