import { Router } from "express";
import { createEmployee, createInvitation, getEmployees, getInvitations } from "../controllers/employeecontroller";

export const router = Router();

router.post("/employees", createEmployee);
router.get("/employees", getEmployees);
router.post("/invitations", createInvitation);
router.get("/invitations", getInvitations);
