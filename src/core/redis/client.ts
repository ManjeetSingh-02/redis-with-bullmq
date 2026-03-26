// internal-imports
import { env } from '../config/env.js';

// external-imports
import { Redis } from 'ioredis';

// create a new redis client
export const redisClient = new Redis({
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  maxRetriesPerRequest: null,
});
