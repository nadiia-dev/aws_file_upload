import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ConfigModule } from '@nestjs/config';
import { SqsModule } from '@ssut/nestjs-sqs';
import { config } from '../config';
import { SQSClient } from '@aws-sdk/client-sqs';
import { S3Module } from 'src/s3/s3.module';
import { ParserModule } from 'src/parser/parser.module';
import { SearchModule } from 'src/search/search.module';

@Module({
  imports: [
    SqsModule.registerAsync({
      useFactory: () => {
        return {
          consumers: [
            {
              name: config.SQS_QUEUE!,
              queueUrl: config.SQS_QUEUE_URL!,
              region: config.AWS_REGION,
              sqs: new SQSClient({
                region: config.AWS_REGION,
                credentials: {
                  accessKeyId: config.ACCESS_KEY_ID!,
                  secretAccessKey: config.SECRET_ACCESS_KEY!,
                },
              }),
            },
          ],
          producers: [],
        };
      },
    }),
    ConfigModule,
    S3Module,
    ParserModule,
    SearchModule,
  ],
  providers: [ConsumerService],
  exports: [ConsumerService],
})
export class ConsumerModule {}
