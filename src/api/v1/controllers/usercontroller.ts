import { Request, Response } from "express";
import admin from "firebase-admin";

// Get user details by UID
export const getUser = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const userRecord = await admin.auth().getUser(uid);
    res.status(200).json({ user: userRecord });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

// Set custom claims (admin route)
export const setUserRole = async (req: Request, res: Response) => {
  const { uid } = req.params;
  const { role } = req.body; // e.g., "admin" or "user"

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    res.status(200).json({ message: `Role ${role} set for user ${uid}` });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
