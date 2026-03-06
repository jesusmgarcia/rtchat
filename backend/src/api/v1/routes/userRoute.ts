import { Router } from 'express';
import { register, login, logout } from '../controllers/userController';

export const userRouterV1 = Router({ mergeParams: true });

userRouterV1.route('/register').post(register);
userRouterV1.route('/login').post(login);
userRouterV1.route('/logout').post(logout);
