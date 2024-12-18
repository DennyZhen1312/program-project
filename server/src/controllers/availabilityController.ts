import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const requestAvailabilities = async (req: Request, res: Response) => {
  try {
    const updatedUsers = await prisma.employee.updateMany({
      data: {
        isAvailabilityRequested: true
      }
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

export const postUserAvailability = () => {};
