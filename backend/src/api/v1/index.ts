import express from 'express';
import { userRouterV1 } from './routes/userRoute';

export const v1Router = express.Router();

v1Router.use('/user', userRouterV1);
