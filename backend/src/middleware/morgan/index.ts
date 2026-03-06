import { srvConfig } from 'loaders/app';
import morgan from 'morgan';
import logger from 'utils/logger';

const stream = {
  // Use the http severity
  write: (message: string) => {
    logger.http(message.slice(0, -1)); // Remove extra line feed \n
  },
};

const skip = () => {
  const env = srvConfig.environment ?? 'development';
  return env !== 'development';
};
/*
const morganController = morgan(
  // Define message format string (this is the default one).
  // The message format is made from tokens, and each token is
  // defined inside the Morgan library.
  // You can create your custom token to show what do you want from a request.
  ':remote-addr :method :url :status :res[content-length] - :response-time ms',
  // Options: in this case, I overwrote the stream and the skip logic.
  // See the methods above.
  { stream, skip }
);*/

const morganMiddleware = morgan('dev', { stream, skip });

export default morganMiddleware;
