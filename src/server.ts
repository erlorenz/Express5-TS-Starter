import express from 'express';
import logger from './config/logger';
import config, { validateConfig } from './config';
import { initializeMiddleware } from './middleware';

process.on('unhandledRejection', (reason: Error) => {
  logger.fatal('unhandled rejection');
  throw reason;
});

process.on('uncaughtException', (reason: Error) => {
  logger.fatal('Uncaught Exception: ' + reason.message);
  process.exit(1);
});

validateConfig();

const app = express();

initializeMiddleware(app);

app.listen(config.PORT, () => {
  logger.info(`Listening on port ${config.PORT}`);
});
