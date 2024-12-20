import { prisma } from "@/lib/prisma";

export const getShifts = async () => {
  return prisma.shift.findMany();
};
