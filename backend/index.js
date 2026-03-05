import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/user', userRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
