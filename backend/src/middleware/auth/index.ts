import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { srvConfig } from 'loaders/app';
import logger from 'utils/logger';

export interface AuthMiddlewareRequest extends Request {
  cookies: {
    token: string;
  };
}

//interface MiddlewareResponse extends Response {}

const isAuthenticated = (req: AuthMiddlewareRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: 'User not authenticated',
        success: false,
      });
    }
    const decode = jwt.verify(token, srvConfig.jwtSecret);
    if (!decode || typeof decode === 'string') {
      return res.status(401).json({
        message: 'Invalid token',
        success: false,
      });
    }

    req.user = decode.userId as string;
    next();
  } catch (error) {
    logger.error(error);
  }
};
export default isAuthenticated;
