import { string, z } from 'zod';
import logger from './logger';

const configVars = {
  PORT: process.env.PORT || '5000',
  NODE_ENV: process.env.NODE_ENV || 'development',
};

const schema = z.object({
  PORT: z.string().length(4),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  // MISSING: string(),
});

export function validateConfig() {
  try {
    schema.parse(configVars);
  } catch (err) {
    if (err instanceof z.ZodError) {
      const listOfVars = Object.keys(err.flatten().fieldErrors);
      throw new Error(
        'Missing/Incorrect ENV variables: ' + listOfVars.join(', ')
      );
    }
  }
}

export default configVars;
