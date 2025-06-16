import { SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConsumerService {
  private sqsClient: SQSClient;
  private queueUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.queueUrl = this.configService.get<string>('SQS_QUEUE_URL')!;

    this.sqsClient = new SQSClient({
      region: this.configService.get<string>('AWS_REGION')!,
      credentials: {
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('SECRET_ACCESS_KEY')!,
      },
    });
  }
}
