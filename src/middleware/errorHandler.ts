import { NextFunction, Request, Response } from 'express';
import logger from '../config/logger';
import { HttpException } from '../utils/error/HttpExceptions';

export default function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	_next: NextFunction,
) {

	// Do some checking for the type and respond approproately
	logger.error(err, err.message);

	if (err instanceof HttpException) {
		return res.status(err.statusCode).send({ error: err.message });
	};

	
	return res.status(500).send({message: err.message});

}
 