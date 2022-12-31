import { z } from 'zod';
import { BadRequestException } from './error/HttpExceptions';

export function validateBody<T>(schema: z.ZodSchema, body: unknown) {
	try {
		const parsed = schema.parse(body);
		return parsed as T;
	} catch (err: unknown) {
		if (err instanceof z.ZodError) {
			throw new BadRequestException(err.message);
		}
	}
}
