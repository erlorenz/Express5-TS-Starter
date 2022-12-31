import { z } from 'zod';
import { BadRequestException } from './error/HttpExceptions';

export function validateBody<InferredType>(schema: z.ZodSchema, body: unknown) {
	if (!body) {
		throw new BadRequestException('No data passed in body.');
	}
	try {
		const parsed = schema.parse(body);
		return parsed as InferredType;
	} catch (err: unknown) {
		if (err instanceof z.ZodError) {
			throw new BadRequestException(err.message);
		}
		throw new BadRequestException('Error in validation');
	}
}
