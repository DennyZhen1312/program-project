"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Availability, Employee, EmployeeAvailability } from "@prisma/client";
import { ActionEventArgs } from "@syncfusion/ej2-schedule";

export const getAvailabilities = async (): Promise<Availability[]> => {
  return prisma.availability.findMany({
    orderBy: {
      id: "desc"
    }
  });
};

export const getEmployeeAvailabilities = async (
  id: number
): Promise<EmployeeAvailability[]> => {
  const employee = await getCurrentEmployee();

  return prisma.employeeAvailability.findMany({
    where: { AND: [{ availabilityId: id }, { employeeId: employee?.id }] }
  });
};

export const createEmployeeAvailability = async (
  args: ActionEventArgs,
  availabilityId: number
) => {
  if (args.requestType === "eventCreated") {
    const employee = await getCurrentEmployee();
    const event = args.addedRecords?.[0];

    if (event && employee) {
      await prisma.employeeAvailability.create({
        data: {
          startTime: new Date(event.StartTime),
          endTime: new Date(event.EndTime),
          availabilityId,
          employeeId: employee?.id
        }
      });
    }
  }
};

const getCurrentEmployee = async (): Promise<Employee | null> => {
  const clerkUser = await currentUser();
  return await prisma.employee.findFirst({
    where: { clerkId: clerkUser?.id }
  });
};
