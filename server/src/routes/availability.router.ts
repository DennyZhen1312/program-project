import express, { Router } from "express";
import {
  requestAvailabilities,
  isRequested,
  postUserAvailability,
  getAvailabilities,
} from "../controllers/availabilityController";

const availabilityRouter: Router = express.Router();

availabilityRouter.get("/employeeAvailability", getAvailabilities);
availabilityRouter.post("/requestAvailabilities", requestAvailabilities);
availabilityRouter.get("/isRequested/:id", isRequested);
availabilityRouter.post("/employeeAvailability/", postUserAvailability);

export default availabilityRouter;
