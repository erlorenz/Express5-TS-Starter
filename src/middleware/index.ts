import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import logger from '../config/logger';
import errorHandler from './errorHandler';

export function initializeMiddleware(app: Express) {
  app.use(express.json());
  app.use(cors());

  app.get('/testAsyncError', async (req: Request, res: Response) => {
    await new Promise((resolve, reject) => reject('Because I said so!'));
  });

  app.use(errorHandler);
}
