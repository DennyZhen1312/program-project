import { Router } from "express";
import {
  createStation,
  getStations,
  getStationById,
  deleteStationById,
  updateStationByID,
} from "../controllers/stationcontroller";

export const router = Router();

router.post("/", createStation);
router.get("/", getStations);
router.get("/:id", getStationById);
router.delete("/:id", deleteStationById);
router.patch("/:id", updateStationByID);
