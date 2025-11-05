import request from "supertest";
import express, { Request, Response, NextFunction } from "express";
import { consoleLogger, accessLogger, errorLogger } from "../src/api/v1/middleware/errorlogger";

describe("Logging Middleware", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Spy on console.log
    jest.spyOn(console, "log").mockImplementation(() => {});

    // Mount logging middleware
    app.use(consoleLogger);
    app.use(accessLogger);
    app.use(errorLogger);

    // Dummy route
    app.get("/test", (req: Request, res: Response) => res.status(200).json({ message: "OK" }));

    // Error route
    app.get("/error", (req: Request, res: Response) => {
      throw new Error("Test error");
    });

    // Error handling middleware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({ message: err.message });
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should log GET requests", async () => {
    const res = await request(app).get("/test");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "OK");
    expect(console.log).toHaveBeenCalled();
  });

  it("should log errors", async () => {
    const res = await request(app).get("/error");
    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Test error");
    expect(console.log).toHaveBeenCalled();
  });

});
