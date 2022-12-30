import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import logger from '../config/logger';
import { HttpException } from '../utils/error/HttpExceptions';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error('Error hit the express error handler.');

  // Do some checking for the type and response approproately
  if (err instanceof HttpException) {
    logger.error(err, err.message);
    return res.status(err.statusCode).send({ error: err.message });
  }

  res.status(500).send({ message: 'Caught in Express error handler.' });
}
