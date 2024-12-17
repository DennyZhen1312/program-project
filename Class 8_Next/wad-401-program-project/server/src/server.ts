import express from 'express';
import cors from 'cors';
import { router as shiftRouter }  from './routes/shift.router';
import { router as stationRouter }  from './routes/station.router';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors()); 
app.use(express.json()); 

app.use('/api', shiftRouter);
app.use("/api", stationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
