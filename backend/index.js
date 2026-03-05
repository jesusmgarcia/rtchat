import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
