import { Router } from "express";
import { getUser, setUserRole } from "../controllers/usercontroller";

const router = Router();

// Public route to get user details
router.get("/:uid", getUser);

// Admin route to set role
router.post("/:uid/role", setUserRole);

export default router;
