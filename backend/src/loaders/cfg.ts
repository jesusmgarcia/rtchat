import express from 'express';
import logger from 'utils/logger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import morganMiddleware from 'middleware/morgan';
import { rateLimit } from 'express-rate-limit';
import { srvConfig } from './app';
import path from 'path';

export const loadConfig = (app: express.Application) => {
  logger.info('Initializing server configuration');

  // Enable gzip compression for production
  if (srvConfig.environment === 'production') {
    logger.info('Enable compression in productions');
    app.use(compression());
  }

  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  //app.use(bodyParser.json({ type: 'application/json', strict: false }));
  app.use(express.json());
  // Add the morgan http request log middleware
  app.use(morganMiddleware);

  app.use('/assets', express.static(path.join(__dirname, '../assets')));

  // Add rate limiting per IP
  if (srvConfig.environment === 'production') {
    logger.info('Enable rate limit for each IP to 20 requests per 1 min');
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minutes
      limit: 20, // Limit each IP to 20 requests per `window`
      standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
      // store: ... , // Redis, Memcached, etc. See below.
    });

    // Apply the rate limiting middleware to all requests.
    app.use(limiter);
  }
};
