import { RequestHandler, Router } from 'express';
import { register, login, logout, getOtherUsers } from '../controllers/userController';
import isAuthenticated from 'middleware/auth';

export const userRouterV1 = Router({ mergeParams: true });

userRouterV1.route('/register').post(register);
userRouterV1.route('/login').post(login);
userRouterV1.route('/logout').post(logout);
userRouterV1.route('/').get(isAuthenticated as RequestHandler, getOtherUsers);
