// internal-imports
import { redisClient } from '../../redis/client.js';
import { APP_CONFIG } from '../../config/constants.js';

// external-imports
import { Worker } from 'bullmq';

// create a new worker for processing videos
export const processVideoWorker = new Worker(
  APP_CONFIG.QUEUE_MAP.PROCESS_VIDEO_QUEUE,
  async job => console.log(`Processing Video: ${{ id: job.id, url: job.data }}`),
  { autorun: false, connection: redisClient }
);
