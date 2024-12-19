import { WithAuthProp } from "@clerk/clerk-sdk-node";
import { NextFunction, Request, Response } from "express";
import { clerkClient } from "../clerk/client";

export const validateUser = async (
  req: WithAuthProp<Request>,
  res: Response,
  next: NextFunction
) => {
  const clerkId = req.auth.userId;

  if (clerkId) {
    const user = await clerkClient.users.getUser(clerkId);
    const clerkEmail = user.emailAddresses[0].emailAddress;

    // // Fetch user's role and organization ID from the database
    // const dbUser = await prisma.employee.findUnique({
    //   where: { email: clerkEmail },
    // });

    if (user) {
      // req.userRole = dbUser?.position; // Example: "Admin", "Manager"
      // req.userOrganizationId = dbUser?.organizationId as string;
      return next();
    }
  }

  res.status(401).json({ message: "unauthorized" });
};
