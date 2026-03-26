// internal-imports
import { processVideoQueue, validateZodSchema } from '@/core/index.js';

// external-imports
import express from 'express';
import z from 'zod';

// type-imports
import type { Application } from 'express';

// function to create application
export default function createApp(): Application {
  // create express application
  const application = express();

  // attach middlewares
  application.use(express.json()).use(express.urlencoded({ extended: true }));

  // route to add videoURL to the queue
  application.post(
    '/video',
    validateZodSchema(
      z.object({
        body: z.object({
          videoURL: z.url({ error: 'Video URL must be a valid URL' }),
        }),
      })
    ),
    async (request, response) => {
      // add video URL to the queue
      const job = await processVideoQueue.add(`video-${request.body.videoURL}`, {
        url: request.body.videoURL,
      });

      // send response
      return response.status(200).json({
        success: true,
        message: 'Video URL added to the queue',
        data: {
          jobID: job.id,
          status: 'enqueued',
          videoURL: request.body.videoURL,
        },
      });
    }
  );

  // return the application
  return application;
}
