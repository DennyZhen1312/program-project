import { Router } from "express";
import { createScheduleTable, getScheduleTable } from "../controllers/scheduletablecontroller";

export const router = Router();

router.post("/scheduleTable", createScheduleTable);
router.get("/scheduleTable", getScheduleTable);
