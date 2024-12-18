import express, { Router } from "express";
import { requestAvailabilities } from "../controllers/availabilityController";

const availabilityRouter: Router = express.Router();

availabilityRouter.post("/requestAvailabilities", requestAvailabilities);

export default availabilityRouter;
