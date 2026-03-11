import express from 'express';
import dotenv from 'dotenv';
import http, { Server } from 'http';
import logger from 'utils/logger';
import { loadRestApi } from './restapi';
import { loadCORS } from './cors';
import { loadConfig } from './cfg';
import { closeDb, openDb } from './db';
import { Server as IOServer } from 'socket.io';

let httpServer: Server | null = null;
export let ioServer;
const userSocketMap = {}; // {userId->socketId}

// Process environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const {
  NODE_ENV = 'development',
  SRV_PORT = '8000',
  SRV_URL = 'http://localhost',
  MONGO_URI = 'mongodb + srv://user:password@server/',
  JWT_SECRET = 'secret',
  CORS_ORIGIN = 'http://localhost:8000',
} = process.env;

export const srvConfig = {
  // env config
  environment: NODE_ENV,
  srvPort: SRV_PORT,
  srvUrl: SRV_URL,
  mongoUri: MONGO_URI,
  jwtSecret: JWT_SECRET,
  corsOrigin: CORS_ORIGIN,
};

export const appInit = async () => {
  const app = express();
  httpServer = http.createServer(app);
  if (!httpServer) {
    process.exitCode = 1;
    return;
  }

  // Init IO server
  logger.info('Initialazing Socket.io server');
  ioServer = new IOServer(httpServer, {
    cors: {
      origin: [srvConfig.corsOrigin],
      methods: ['GET', 'POST'],
    },
  });

  // Load Config
  loadConfig(app);
  // CORS
  loadCORS(app);
  // Rest Api
  loadRestApi(app);

  ioServer.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    logger.info('Socket.io Connect. User: ' + userId + ' Socket: ' + socket.id);
    if (userId !== undefined) {
      userSocketMap[userId as string] = socket.id;
    }

    ioServer.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
      logger.info('Socket.io Disconnect. User: ' + userId + ' Socket: ' + socket.id);
      delete userSocketMap[userId as string];
      ioServer.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });

  // Open Database
  const dbConnected = await openDb();
  if (!dbConnected) {
    process.exitCode = 1;
    return;
  }

  // Start listening
  await new Promise<void>((resolve, _reject) => {
    httpServer?.listen(srvConfig.srvPort, () => {
      logger.info(`Server listening to port ${srvConfig.srvPort}`);
      resolve();
    });
  });
};

export const appClose = async () => {
  try {
    // Close Database
    await closeDb();
    // Close HTTP server
    await new Promise<void>((resolve, reject) =>
      httpServer?.close((error) => {
        if (error) {
          logger.error('Error closing http server: ', error);
          reject(error);
        } else {
          resolve();
        }
      })
    );
    logger.info('Server closed');
    process.exitCode = 0;
  } catch (error) {
    logger.error('Error closing backend: ', error);
    process.exitCode = 1;
  }
};

export const getReceiverSocketId = (receiverId: string) => {
  return userSocketMap[receiverId];
};
