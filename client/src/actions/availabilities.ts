import { prisma } from "@/lib/prisma";
import { Availability } from "@prisma/client";

export const getAvailabilities = async (): Promise<Availability[]> => {
  return prisma.availability.findMany();
};
