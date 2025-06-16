import { Injectable } from '@nestjs/common';
import { SqsMessageHandler } from '@ssut/nestjs-sqs';
import * as AWS from 'aws-sdk';

@Injectable()
export class ConsumerService {
  constructor() {}
  @SqsMessageHandler(process.env.SQS_QUEUE!, false)
  handleMessage(message: AWS.SQS.Message) {
    const obj: any = JSON.parse(message.Body!) as {
      message: string;
      date: string;
    };
    const { data } = JSON.parse(obj.Message);
    console.log(data);
  }
}
