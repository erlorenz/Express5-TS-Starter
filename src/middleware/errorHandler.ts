import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Error hit the express error handler.');
  res.sendStatus(500);
}
