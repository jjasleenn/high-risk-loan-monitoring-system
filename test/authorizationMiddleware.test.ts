import { authorize } from "../src/api/v1/middleware/authorizationMiddleware";
import { AppError } from "../src/api/v1/errors/appErrors";

describe("Authorization Middleware", () => {
  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockReq = (user?: any, params?: any) => ({
    user,
    params,
  });

  const mockRes = () => ({
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  });

  it("should allow access with correct role", () => {
    const req = mockReq({ role: "admin" });
    const res = mockRes();

    const middleware = authorize({ roles: ["admin"] });
    middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(); // successful next() call
  });

  it("should deny access with insufficient role", () => {
    const req = mockReq({ role: "user" });
    const res = mockRes();

    const middleware = authorize({ roles: ["admin"] });
    middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    const error = next.mock.calls[0][0];
    expect(error.message).toBe("Access denied: insufficient permissions");
    expect(error.statusCode).toBe(403);
  });

  it("should allow same user access when enabled", () => {
    const req = mockReq({ role: "user", uid: "123" }, { id: "123" });
    const res = mockRes();

    const middleware = authorize({ roles: ["admin"], allowSameUser: true });
    middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalledWith();
  });
});
