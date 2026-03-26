// internal-imports
import { redisClient } from '../../redis/client.js';
import { APP_CONFIG } from '../../config/constants.js';

// external-imports
import { Worker } from 'bullmq';

// create a new worker for sending emails
export const emailWorker = new Worker(
  APP_CONFIG.QUEUE_MAP.EMAIL_QUEUE,
  async job => console.log(`Sending Email(${job.id}): ${job.data.message}`),
  { connection: redisClient }
);
