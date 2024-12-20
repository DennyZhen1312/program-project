import { Request, Response } from "express";
import { prisma } from "../../prisma/client";

export const createScheduleTable = async (req: Request, res: Response) => {
  try {
    const { name, startTime, endTime, station, scheduleId } = req.body;

    if (!name || !startTime || !endTime || !scheduleId) {
       res.status(400).json({ error: "Invalid task data" });
       return
    }

    const newTask = await prisma.scheduleTable.create({
      data: { name, startTime: new Date(startTime), endTime: new Date(endTime), station, scheduleId },
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getScheduleTable = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.scheduleTable.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
