import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { HttpException } from '../utils/error/HttpExceptions';

export default function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	_next: NextFunction,
) {
	logger.error(err, err.message);

	let test = 'sdfafs' + 'sdffd';

	// Do some checking for the type and response approproately
	if (err instanceof HttpException) {
		return res.status(err.statusCode).send({ error: err.message });
	}

	res.status(500).send({ message: 'Internal error.' });
}
