import { Availability } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function checkEmployeeAvailability(
  availabilities: (Availability & { employee: { name: string } })[],
  employee: string,
  startTime: string,
  endTime: string
): { isAvailable: boolean; message?: string } | void {
  const dayOfWeek = new Date(startTime)
    .toLocaleString("en-US", { weekday: "long" })
    .toLowerCase();

  const employeeAvailability = availabilities.find(
    (item) => item.employee.name === employee
  );

  if (!employeeAvailability) {
    return { isAvailable: false, message: `Employee not found` };
  }

  const dayAvailability =
    employeeAvailability[dayOfWeek as keyof typeof employeeAvailability];

  if (!dayAvailability) {
    return { isAvailable: false, message: `Not available on ${dayOfWeek}` };
  }

  const startAvailableTimeStamp = new Date(
    dayAvailability.toString().split(",")[0]
  ).getTime();
  const endAvailableTimeStamp = new Date(
    dayAvailability.toString().split(",")[1]
  ).getTime();

  const startScheduledTime = new Date(startTime).getTime();
  const endScheduledTime = new Date(endTime).getTime();

  if (
    startScheduledTime >= startAvailableTimeStamp &&
    endScheduledTime <= endAvailableTimeStamp
  ) {
    return { isAvailable: true };
  } else {
    return {
      isAvailable: false,
      message: `Scheduled time does not fit within the available time slot on ${dayOfWeek}. The user is available from ${new Date(
        startAvailableTimeStamp
      ).toLocaleTimeString()} to ${new Date(
        endAvailableTimeStamp
      ).toLocaleTimeString()}`,
    };
  }
}
