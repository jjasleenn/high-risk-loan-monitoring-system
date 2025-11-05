import request from "supertest";
import app from "../src/app"; 

describe("Loan API Endpoints", () => {

  it("should return all loans", async () => {
    const res = await request(app).get("/api/v1/");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Loan list retrieved successfully");
    expect(Array.isArray(res.body.loans)).toBe(true);
    expect(res.body.loans.length).toBeGreaterThan(0);
  });

  it("should create a new loan", async () => {
    const res = await request(app)
      .post("/api/v1/")
      .send({ applicant: "Alice", amount: 10000, risk: "high" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("message", "Loan created successfully");
  });

  it("should review a loan", async () => {
    const res = await request(app)
      .put("/api/v1/1/review")
      .send({ reviewer: "Bob", comments: "Looks good" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Loan 1 reviewed successfully");
  });

  it("should approve a loan", async () => {
    const res = await request(app)
      .put("/api/v1/1/approve")
      .send({ approver: "Manager1" });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Loan 1 approved successfully");
  });

});
