import { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import { clerkClient } from "../clerk/client";

export const getAvailabilities = async (req: Request, res: Response) => {
  try {
    const availabilities = await prisma.availability.findMany();
    res.status(200).json(availabilities);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const requestAvailabilities = async (req: Request, res: Response) => {
  try {
    const updatedUsers = await prisma.employee.updateMany({
      data: {
        isAvailabilityRequested: true
      },
      where: { NOT: { role: "MANAGER" } }
    });

    res.status(200).json({
      message: "All users' availability request status updated successfully.",
      count: updatedUsers.count
    });
  } catch (error) {
    console.error("Error updating availability request status:", error);
    res
      .status(500)
      .json({ error: "Failed to update availability request status" });
  }
};

export const isRequested = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.employee.findUnique({
      where: { id: +id }
    });
    if (!user) {
      res.status(404).json({ error: "User not found" });
    }
    const isRequested = user!.isAvailabilityRequested;

    res.status(200).json(isRequested);
  } catch (error) {
    console.error("Error checking availability request status:", error);
    res.status(500).json({
      error: "Failed to check availability request status"
    });
  }
};

export const postUserAvailability = async (req: Request, res: Response) => {
  const { availability } = req.body;

  try {
    if (!availability || !availability.startDate || !availability.endDate) {
      res.status(400).json({ error: "Invalid availability data" });
      return;
    }

    const clerkId = req.auth.userId;

    if (!clerkId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Fetch the email from Clerk
    const clerkUser = await clerkClient.users.getUser(clerkId);
    const email = clerkUser.primaryEmailAddress?.emailAddress;

    if (!email) {
      res.status(400).json({ error: "User email not found" });
      return;
    }

    // Find the employee with the matching email
    const employee = await prisma.employee.findFirst({
      where: { email }
    });

    if (!employee) {
      res.status(404).json({ error: "Employee not found" });
      return;
    }

    const { id: employeeId, name } = employee;

    // TODO: create user availability
    // Create availability
    // const newUserAvailability = await prisma.employeeAvailability.create({
    //   data: {
    //     startDate: new Date(availability.startDate),
    //     endDate: new Date(availability.endDate)
    //   }
    // });

    // Update the employee's isAvailabilityRequested status to false
    await prisma.employee.update({
      where: { id: employeeId },
      data: { isAvailabilityRequested: false }
    });

    res.status(201).json({
      message: "Availability created and request status updated successfully",
      data: "rework" // newAvailability
    });
  } catch (error) {
    console.error("Error creating availability:", error);
    res.status(500).json({ error: "Failed to create availability" });
  }
};

export const getUserAvailability = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
  } catch (error) {}
};
