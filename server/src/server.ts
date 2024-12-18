import { config } from "dotenv";
import { createClerkClient } from "@clerk/express";
import express from "express";
import cors from "cors";
import { router as shiftRouter } from "./routes/shift.router";
import { router as stationRouter } from "./routes/station.router";
import { router as employeeRouter } from "./routes/employee.router";
import availabilityRouter from "./routes/availability.router";
import { ClerkExpressWithAuth, LooseAuthProp } from "@clerk/clerk-sdk-node";
import { validateUser } from "./middleware/validate-user";

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {
      // userRole?: string;
      // userOrganizationId?: string;
    }
  }
}

config();

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(ClerkExpressWithAuth());

// app.use(validateUser);
app.use("/api", shiftRouter);
app.use("/api", stationRouter);
app.use("/api", employeeRouter);
app.use("/api", availabilityRouter);

app.get("/users", async (req, res) => {
  // Get the `userId` from the `Auth` object
  const clerkId = req.auth.userId as string;
  const user = await clerkClient.users.getUser(clerkId);
  res.status(200).json(user);
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
