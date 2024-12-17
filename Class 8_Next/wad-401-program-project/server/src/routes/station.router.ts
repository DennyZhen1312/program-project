import { Router } from "express";
import {
  createStation,
  getStations,
  getStationById,
  deleteStationById,
  updateStationByID,
} from "../controllers/stationcontroller";

export const router = Router();

router.post("/stations", createStation);
router.get("/stations", getStations);
router.get("/stations/:id", getStationById);
router.delete("/stations/:id", deleteStationById);
router.patch("/stations/:id", updateStationByID);
