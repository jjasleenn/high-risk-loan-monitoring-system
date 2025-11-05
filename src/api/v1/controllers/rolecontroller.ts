import { Request, Response } from "express";
import admin from "firebase-admin"

export const assignRole = async (req: Request, res: Response) => {
  const { uid, role } = req.body;

  try {
    await admin.auth().setCustomUserClaims(uid, { role });
    res.status(200).json({ message: `Role '${role}' assigned to user ${uid}` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserRole = async (req: Request, res: Response) => {
  const { uid } = req.params;

  try {
    const user = await admin.auth().getUser(uid);
    res.status(200).json({ uid, claims: user.customClaims || {} });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
