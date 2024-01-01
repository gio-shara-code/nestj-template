import { parseEnv } from 'znv';
import { z } from 'zod';

export default () =>
  parseEnv(process.env, {
    NODE_ENV: z.enum(['development', 'production', 'test']),
    DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
    PORT: z.number(),
    RSA_PRIVATE_KEY: z.string(),
    JWT_SECRET_KEY: z.string(),
  });
