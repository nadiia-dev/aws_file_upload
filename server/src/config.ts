import dotenv from 'dotenv';

dotenv.config();

export const config = {
  SQS_QUEUE: process.env.SQS_QUEUE,
  SQS_QUEUE_URL: process.env.SQS_QUEUE_URL,
  AWS_REGION: process.env.AWS_REGION,
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
  OPENSEARCH_URL: process.env.OPENSEARCH_URL,
  ADMIN_USER: process.env.ADMIN_USER,
  ADMIN_PASS: process.env.ADMIN_PASS,
};
