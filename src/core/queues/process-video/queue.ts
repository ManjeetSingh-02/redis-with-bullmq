// internal-imports
import { redisClient } from '../../redis/client.js';
import { APP_CONFIG } from '../../config/constants.js';

// external-imports
import { Queue } from 'bullmq';

// create a new queue for processing videos
export const processVideoQueue = new Queue(APP_CONFIG.QUEUE_MAP.PROCESS_VIDEO_QUEUE, {
  connection: redisClient,
});
