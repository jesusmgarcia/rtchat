import express from 'express';
import { userRouterV1 } from './routes/userRoute';
import { messageRouterV1 } from './routes/messageRoute';

export const v1Router = express.Router();

v1Router.use('/user', userRouterV1);
v1Router.use('/message', messageRouterV1);
