import express from 'express';
import { v1Router } from 'api/v1';
import logger from 'utils/logger';

export const loadRestApi = (app: express.Application) => {
  logger.info('Initialazing REST API v1 router');

  app.use('/api/v1', v1Router);
};
