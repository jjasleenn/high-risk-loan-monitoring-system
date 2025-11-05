import { Router } from "express";
import { assignRole, getUserRole } from "../controllers/rolecontroller";

const router = Router();

router.post("/assign", assignRole);     
router.get("/:uid", getUserRole);        

export default router;
