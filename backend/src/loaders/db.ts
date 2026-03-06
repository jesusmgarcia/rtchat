import { dbConnect, dbClose } from 'db/db';
import logger from 'utils/logger';
export const openDb = async () => {
  try {
    await dbConnect();
    logger.info('DB connected');
    return true;
  } catch (error) {
    logger.error('Error initialazing DB: ', error);
    return false;
  }
};

export const closeDb = async () => {
  try {
    await dbClose();
    logger.info('DB disconnected');
    return true;
  } catch (error) {
    logger.error('Error closing DB: ', error);
    return false;
  }
};
