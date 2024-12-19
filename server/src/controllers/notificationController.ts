import { clerkClient } from "@clerk/clerk-sdk-node";
import { Request, Response } from "express";
import { prisma } from "../../prisma/client";

// TODO: Faking for demo, implement correctly later
export const getNotifications = async (req: Request, res: Response) => {
  const clerkId = req.auth.userId as string;
  const clerkUser = await clerkClient.users.getUser(clerkId);

  const user = await prisma.employee.findFirst({
    where: {
      email: clerkUser.primaryEmailAddress?.emailAddress
    }
  });

  const notifications = [];

  if (user?.isAvailabilityRequested) {
    notifications.push({
      id: 1,
      message: "Please submit the weekly availability "
    });
  }

  res.json(notifications);
};
