import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Controller to create a new shift
export const createShift = async (req: Request, res: Response) => {
  try {
    const { name, startTime, endTime } = req.body;

    // Validation
    if (!name || !startTime || !endTime) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // Insert into database
    const newShift = await prisma.shift.create({
      data: {
        name,
        startTime,
        endTime,
      },
    });

    res.status(201).json(newShift);
    return;
  } catch (error) {
    console.error("Error creating shift:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};

// Controller to get all shifts
export const getShifts = async (req: Request, res: Response) => {
  try {
    const shifts = await prisma.shift.findMany();
    res.status(200).json(shifts);
    return;
  } catch (error) {
    console.error("Error fetching shifts:", error);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
