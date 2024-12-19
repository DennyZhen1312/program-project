import { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import { clerkClient } from "../clerk/client";

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      res.status(400).json({ error: "Name and email are required" });
      return;
    }

    const newEmployee = await prisma.employee.create({
      data: { name, email }
    });

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createInvitation = async (req: Request, res: Response) => {
  const { emailAddress, redirectUrl } = req.body;

  try {
    const response = await clerkClient.invitations.createInvitation({
      emailAddress,
      redirectUrl: redirectUrl || "http://localhost:5173/employee-signup"
    });

    res.status(200).json({ success: true, invitation: response });
  } catch (error) {
    console.error("Error creating invitation:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to create invitation" });
  }
};

// GET endpoint for retrieving all invitations
export const getInvitations = async (req: Request, res: Response) => {
  try {
    const invitations = await clerkClient.invitations.getInvitationList();
    res.status(200).json(invitations);
  } catch (error) {
    console.error("Error fetching invitations:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch invitations" });
  }
};
