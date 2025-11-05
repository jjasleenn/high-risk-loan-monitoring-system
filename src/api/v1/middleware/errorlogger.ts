import { Request, Response, NextFunction } from "express";

// Logs all incoming requests (access logs)
export const accessLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[ACCESS] ${req.method} ${req.url}`);
  next();
};

// Logs server-side errors (error logs)
export const errorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`[ERROR] ${err.message}`);
  next(err);
};

// Simple console logger for development
export const consoleLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[DEV] ${req.method} ${req.url}`);
  next();
};
