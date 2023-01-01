import { z } from 'zod';
import { BadRequestException } from './error/HttpExceptions';
import { ParsedQs } from 'qs';

// Validation utilities for req.body and req.query

export function validateBody<T extends z.ZodTypeAny>(schema: T, body: unknown) {
	try {
		type Inferred = z.infer<typeof schema>;

		const parsed: Inferred = schema.parse(body);
		return parsed;
	} catch (err: unknown) {
		// Send stringified ZodIssue[]
		if (err instanceof z.ZodError) {
			throw new BadRequestException(JSON.stringify(err.issues));
		}

		let message = 'Error while validating request.';
		if (err instanceof Error) {
			message = err.message;
		}
		throw new BadRequestException(message);
	}
}

export function validateQuery<T extends z.ZodTypeAny>(
	schema: T,
	query: ParsedQs,
) {
	try {
		type Inferred = z.infer<typeof schema>;

		const parsed: Inferred = schema.parse(query);
		return parsed;
	} catch (err: unknown) {
		// Send stringified ZodIssue[]
		if (err instanceof z.ZodError) {
			throw new BadRequestException(JSON.stringify(err.issues));
		}

		let message = 'Error while validating request.';
		if (err instanceof Error) {
			message = err.message;
		}
		throw new BadRequestException(message);
	}
}
