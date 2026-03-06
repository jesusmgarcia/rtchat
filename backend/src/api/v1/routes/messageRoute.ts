import { Router } from 'express';
import { getMessage, SendMessage } from '../controllers/messageController';
import isAuthenticated, { AuthMiddlewareRequest } from 'middleware/auth';

export const messageRouterV1 = Router({ mergeParams: true });

messageRouterV1.route('/send/:id').post(
  (req, res, next) => {
    isAuthenticated(req as unknown as AuthMiddlewareRequest, res, next);
  },
  async (req, res) => {
    await SendMessage(req, res);
  }
);

messageRouterV1.route('/:id').get(
  (req, res, next) => {
    isAuthenticated(req as unknown as AuthMiddlewareRequest, res, next);
  },
  async (req, res) => {
    await getMessage(req, res);
  }
);
