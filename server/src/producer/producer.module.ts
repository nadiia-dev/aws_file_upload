import { Module } from '@nestjs/common';
import { SqsModule } from '@ssut/nestjs-sqs';
import { ProducerService } from './producer.service';
import * as AWS from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

@Module({
  imports: [
    SqsModule.register({
      consumers: [],
      producers: [
        {
          name: process.env.SQS_QUEUE!,
          queueUrl: process.env.SQS_QUEUE_URL!,
          region: process.env.AWS_REGION,
        },
      ],
    }),
  ],
  controllers: [],
  providers: [ProducerService],
  exports: [ProducerService],
})
export class ProducerModule {}
