import express from 'express';
import logger from './config/logger';
import config, { validateConfig } from './config';
import { initializeMiddleware } from './middleware';

process.on('uncaughtException', (reason: Error) => {
  logger.fatal(reason, '[Uncaught Exception] ' + reason.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
  logger.fatal('Unhandled rejection, forwarding to global handler...');
  throw reason;
});

// Crash if missing
validateConfig();

// Express Initialization
const app = express();
initializeMiddleware(app);

app.listen(config.PORT, () => {
  logger.info(`Listening on port ${config.PORT}`);
});
