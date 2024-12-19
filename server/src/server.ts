import { config } from "dotenv";
config();

import { ClerkExpressWithAuth, LooseAuthProp } from "@clerk/clerk-sdk-node";
import cors from "cors";
import express from "express";
import { clerkClient } from "./clerk/client";
import { validateUser } from "./middleware/validate-user";
import availabilityRouter from "./routes/availability.router";
import { router as employeeRouter } from "./routes/employee.router";
import { router as notificationRouter } from "./routes/notification.router";
import { router as shiftRouter } from "./routes/shift.router";
import { router as stationRouter } from "./routes/station.router";

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {
      // userRole?: string;
      // userOrganizationId?: string;
    }
  }
}

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(ClerkExpressWithAuth());

app.use(validateUser);
app.use("/api", shiftRouter);
app.use("/api", stationRouter);
app.use("/api", employeeRouter);
app.use("/api", availabilityRouter);
app.use("/api/notifications", notificationRouter);

app.get("/users", async (req, res) => {
  // Get the `userId` from the `Auth` object
  const clerkId = req.auth.userId as string;
  const user = await clerkClient.users.getUser(clerkId);
  res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
