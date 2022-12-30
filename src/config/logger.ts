import pino from 'pino';

const logger = pino({
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;

// TODO: Add structured logging for GCP
