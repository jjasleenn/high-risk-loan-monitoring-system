import { Router } from "express";
import {
  createLoan,
  reviewLoan,
  getLoans,
  approveLoan,
} from "../controllers/loancontroller";

const router = Router();

router.post("/", createLoan);
router.put("/:id/review", reviewLoan);
router.get("/", getLoans);
router.put("/:id/approve", approveLoan);

export default router;