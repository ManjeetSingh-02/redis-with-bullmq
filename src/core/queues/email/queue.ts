// internal-imports
import { redisClient } from '../../redis/client.js';
import { APP_CONFIG } from '../../config/constants.js';

// external-imports
import { Queue } from 'bullmq';

// create a new queue for sending emails
export const emailQueue = new Queue(APP_CONFIG.QUEUE_MAP.EMAIL_QUEUE, {
  connection: redisClient,
});
