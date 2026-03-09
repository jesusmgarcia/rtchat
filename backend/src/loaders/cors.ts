import express from 'express';
import logger from 'utils/logger';
import cors, { CorsOptions } from 'cors';
import { srvConfig } from './app';

export const loadCORS = (app: express.Application) => {
  logger.info('Initialazing CORS');

  const whitelist = [srvConfig.corsOrigin];
  const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));
};
