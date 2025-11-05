import { Request, Response } from "express";

export const createLoan = (req: Request, res: Response) => {
  res.status(201).json({ message: "Loan created successfully" });
};

export const reviewLoan = (req: Request, res: Response) => {
  res.status(200).json({ message: `Loan ${req.params.id} reviewed successfully` });
};

export const getLoans = (req: Request, res: Response) => {
  res.status(200).json({
    message: "Loan list retrieved successfully",
    loans: [{ id: 1, applicant: "John Doe", status: "Pending" }],
  });
};

export const approveLoan = (req: Request, res: Response) => {
  res.status(200).json({ message: `Loan ${req.params.id} approved successfully` });
};
