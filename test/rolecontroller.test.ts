import request from "supertest";
import app from "../src/app";

// Mock Firebase Admin SDK
jest.mock("firebase-admin", () => {
  const authMock = {
    setCustomUserClaims: jest.fn(),
    getUser: jest.fn(),
  };
  return {
    credential: { cert: jest.fn() },
    initializeApp: jest.fn(),
    auth: () => authMock,
  };
});

import admin from "firebase-admin";
const mockAuth = admin.auth();

describe("Role Controller Tests", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set custom claims correctly", async () => {
    (mockAuth.setCustomUserClaims as jest.Mock).mockResolvedValueOnce(undefined);

    const res = await request(app)
      .post("/api/v1/roles/assign")
      .send({ uid: "123", role: "officer" });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Role 'officer' assigned to user 123");
    expect(mockAuth.setCustomUserClaims).toHaveBeenCalledWith("123", { role: "officer" });
  });

  it("should retrieve custom claims correctly", async () => {
    (mockAuth.getUser as jest.Mock).mockResolvedValueOnce({
      uid: "123",
      customClaims: { role: "officer" },
    });

    const res = await request(app).get("/api/v1/roles/123");

    expect(res.statusCode).toBe(200);
    expect(res.body.claims).toEqual({ role: "officer" });
  });

  it("should handle errors when setting claims fails", async () => {
    (mockAuth.setCustomUserClaims as jest.Mock).mockRejectedValueOnce(new Error("Failed to assign"));

    const res = await request(app)
      .post("/api/v1/roles/assign")
      .send({ uid: "999", role: "admin" });

    expect(res.statusCode).toBe(500);
    expect(res.body.message).toBe("Failed to assign");
  });
});
