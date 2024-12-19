import { Router } from "express";
import { getNotifications } from "../controllers/notificationController";

export const router = Router();

router.get("/", getNotifications);
