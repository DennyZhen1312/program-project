"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Employee, Schedule, UserSchedule } from "@prisma/client";
import { redirect } from "next/navigation";
import { DateRange } from "react-day-picker";

export const createSchedule = async (date: DateRange) => {
  // trigger notification
  // send request to trigger notification with fetch request
  const { getToken } = await auth();
  const token = await getToken();

  const response = await fetch(
    "http://localhost:4000/api/requestAvailabilities",
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      method: "POST"
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong while requesting availability");
  }

  const schedule = await prisma.schedule.create({
    data: {
      startDate: date.from!,
      endDate: date.to!
    }
  });

  redirect(`/schedules/${schedule.id}`);
};

export const getSchedules = async () => {
  const schedules = await prisma.schedule.findMany();

  return schedules;
};

export const getSchedule = async (
  id: number
): Promise<
  Schedule & { userSchedules: (UserSchedule & { employee: Employee })[] }
> => {
  const schedule = await prisma.schedule.findUnique({
    where: { id },
    include: { userSchedules: { include: { employee: true } } }
  });

  if (!schedule) {
    throw Error(`Schedule not found with id ${id}`);
  }

  return schedule;
};
