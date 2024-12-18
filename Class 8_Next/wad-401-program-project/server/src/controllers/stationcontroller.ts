import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const createStation = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      res.status(400).json({ error: "Station name is required" });
      return;
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

export const getStationById = async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(404).send("ID needed");
  }
  try {
    const station = await prisma.station.findUnique({
      where: {
        id: +id,
      },
    });
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteStationById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    await prisma.station.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).send("Deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateStationByID = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, description } = req.body;
  try {
    const updatedStation = await prisma.station.update({
      where: { id: +id },
      data: {
        name,
        description: description || "",
      },
    });
    res.status(200).json(updatedStation);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
