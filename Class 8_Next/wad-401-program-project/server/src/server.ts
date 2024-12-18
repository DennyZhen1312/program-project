import express from "express";
import cors from "cors";
import { router as shiftRouter } from "./routes/shift.router";
import { router as stationRouter } from "./routes/station.router";
import availabilityRouter from "./routes/availability.router";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/shifts", shiftRouter);
app.use("/api/stations", stationRouter);
app.use("/api/availability", availabilityRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
