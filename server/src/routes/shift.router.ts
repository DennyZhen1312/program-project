import { Router } from "express";
import { createShift, getShifts } from "../controllers/shiftcontroller";

export const router = Router();

// Route to create a shift
router.post("/shifts", createShift);

// Route to get all shifts
router.get("/shifts", getShifts);