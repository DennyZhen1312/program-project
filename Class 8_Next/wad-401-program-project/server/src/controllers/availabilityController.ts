import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const requestAvailabilities = async (req: Request, res: Response) => {
  try {
    const updatedUsers = await prisma.user.updateMany({
      data: {
        isAvailabilityRequested: true,
      },
    });

    res.status(200).json({
      message: "All users' availability request status updated successfully.",
      count: updatedUsers.count,
    });
  } catch (error) {
    console.error("Error updating availability request status:", error);
    res
      .status(500)
      .json({ error: "Failed to update availability request status" });
  }
};
