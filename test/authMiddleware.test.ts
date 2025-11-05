import { authenticateUser } from "../src/api/v1/middleware/authmiddleware";
import admin from "firebase-admin";

jest.mock("firebase-admin", () => ({
  auth: jest.fn(),
}));


describe("Authentication Middleware", () => {
  const mockReq = (token?: string) => ({
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });

  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle missing token", async () => {
    const req = mockReq();
    const res = mockRes();

    await authenticateUser(req as any, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Missing or invalid token" });
  });

  it("should handle invalid token", async () => {
    (admin.auth as jest.Mock).mockReturnValue({
      verifyIdToken: jest.fn().mockRejectedValue(new Error("Invalid token")),
    });

    const req = mockReq("invalid.token");
    const res = mockRes();

    await authenticateUser(req as any, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Authentication failed" });
  });

  it("should handle valid token", async () => {
    const decoded = { uid: "user123" };

    (admin.auth as jest.Mock).mockReturnValue({
      verifyIdToken: jest.fn().mockResolvedValue(decoded),
    });

    const req = mockReq("valid.token");
    const res = mockRes();

    await authenticateUser(req as any, res, next);

    expect((req as any).user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
  });
});
