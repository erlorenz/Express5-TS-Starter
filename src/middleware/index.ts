import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import errorHandler from './errorHandler';
import { postsRouter } from '../api/posts/endpoints';
import helmet from 'helmet';

export function initializeMiddleware(app: Express) {
	app.use(express.json());
	app.use(cors());

	// To show Express 5 working
	app.get('/testAsyncError', async (req: Request, res: Response) => {
		throw new Error('Error in async handler');
	});

	app.use('/', (req: Request, res: Response) => res.sendStatus(200));
	app.use('/posts', postsRouter);

	app.use(errorHandler);
}
