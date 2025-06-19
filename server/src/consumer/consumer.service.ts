import { Message } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { SqsConsumerEventHandler, SqsMessageHandler } from '@ssut/nestjs-sqs';
import { DocumentQueuePayloadType } from './document-queue-payload.type';
import { S3Service } from 'src/s3/s3.service';
import { config } from 'src/config';
import { ParserService } from 'src/parser/parser.service';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class ConsumerService {
  constructor(
    private readonly s3: S3Service,
    private readonly parser: ParserService,
    private readonly searchService: SearchService,
  ) {}

  @SqsMessageHandler(config.SQS_QUEUE!, false)
  async handleMessage(message: Message) {
    const data: DocumentQueuePayloadType = JSON.parse(
      message.Body!,
    ) as DocumentQueuePayloadType;

    const record = data.Records[0];

    const bucketName = record.s3.bucket.name;
    const objectKey = decodeURIComponent(
      record.s3.object.key.replace(/\+/g, ' '),
    );
    const fileExt = objectKey.split('.').pop();
    let parsedText: string;

    try {
      const res = await this.s3.getFile(bucketName, objectKey);
      if (fileExt === 'pdf') {
        parsedText = await this.parser.parsePdf(res);
      } else if (fileExt === 'docx') {
        parsedText = await this.parser.parseDocx(res);
      } else {
        throw new Error('Unsupported file type');
      }

      const indexres = await this.searchService.indexDocument('documents', {
        content: parsedText,
        objectKey,
        docType: fileExt,
      });
      console.log(indexres);
    } catch (e) {
      console.log(`error handling error`, e);
    }
  }

  @SqsConsumerEventHandler(config.SQS_QUEUE!, 'processing_error')
  public onProcessingError(error: Error, message: Message) {
    try {
      const data: DocumentQueuePayloadType = JSON.parse(
        message.Body!,
      ) as DocumentQueuePayloadType;
      console.log('Message payload:', data);
      throw new Error(`SQS message failed: ${error.message}`);
    } catch (err) {
      console.error('Error while handling the error:', err);
    }
  }
}
