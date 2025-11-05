import { Request, Response, NextFunction } from "express";
import admin from "firebase-admin";

export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    (req as any).user = decodedToken; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};
