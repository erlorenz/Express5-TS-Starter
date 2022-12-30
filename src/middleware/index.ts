import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import logger from '../config/logger';
import errorHandler from './errorHandler';
import { z } from 'zod';
import { postsRouter } from '../api/posts/routes';

export function initializeMiddleware(app: Express) {
  app.use(express.json());
  app.use(cors());

  app.get('/testAsyncError', async (req: Request, res: Response) => {
    throw new Error('Error in async handler');
  });

  app.use('/posts', postsRouter);

  app.use(errorHandler);
}
