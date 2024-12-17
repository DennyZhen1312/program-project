import { Router } from "express";
import { createStation, getStations } from "../controllers/stationcontroller";

export const router = Router();

router.post("/stations", createStation);
router.get("/stations", getStations);
