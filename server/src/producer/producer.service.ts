import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProducerService {
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

  async sendMessage(body: any) {
    const message: any = JSON.stringify(body);

    try {
      await this.sqsClient.send(
        new SendMessageCommand({
          QueueUrl: this.queueUrl,
          MessageBody: message,
        }),
      );
    } catch (error) {
      console.log('error in producing image!', error);
    }
  }
}
