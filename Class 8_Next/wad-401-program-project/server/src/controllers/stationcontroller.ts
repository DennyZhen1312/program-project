import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createStation = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ error: "Station name is required" });
      return
    }

    const newStation = await prisma.station.create({
      data: { name, description },
    });

    res.status(201).json(newStation);
  } catch (error) {
    console.error("Error creating station:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getStations = async (req: Request, res: Response) => {
  try {
    const stations = await prisma.station.findMany();
    res.status(200).json(stations);
  } catch (error) {
    console.error("Error fetching stations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
