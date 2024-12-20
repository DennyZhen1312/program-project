"use server";

import { prisma } from "@/lib/prisma";

export const getEmployees = async () => {
  return await prisma.employee.findMany();
};
