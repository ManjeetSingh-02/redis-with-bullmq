// internal-imports
import { redisClient } from '../../redis/client.js';
import { emailQueue } from '../email/queue.js';
import { APP_CONFIG } from '../../config/constants.js';

// external-imports
import { Worker } from 'bullmq';

// create a new worker for processing videos
export const processVideoWorker = new Worker(
  APP_CONFIG.QUEUE_MAP.PROCESS_VIDEO_QUEUE,
  async job => {
    // process the video
    console.log(`Processing Video(${job.id}): URL(${job.data.videoURL})`);

    // add a new job to email queue
    await emailQueue.add(`email-${job.data.videoURL}`, {
      message: `Video(${job.data.videoURL}) has been processed successfully`,
    });
  },
  {
    connection: redisClient,
    concurrency: 2,
    limiter: {
      max: 2,
      duration: 10000,
    },
  }
);
