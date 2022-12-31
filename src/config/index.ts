import { string, z } from 'zod';
import logger from './logger';

const config = {
	PORT: process.env.PORT || '5000',
	NODE_ENV: process.env.NODE_ENV || 'development',
	API_URL: process.env.API_URL,
};

const schema = z.object({
	PORT: z.string().length(4),
	NODE_ENV: z.enum(['development', 'production', 'test']),
	API_URL: z.string().url(),
	// MISSING: string(),
});

export function validateConfig() {
	try {
		schema.parse(config);
	} catch (err) {
		if (err instanceof z.ZodError) {
			const listOfVars = Object.keys(err.flatten().fieldErrors);
			throw new Error(
				`Missing/Incorrect ENV variables: ${listOfVars.join(', ')}`,
			);
		}
	}
}

export default config;
