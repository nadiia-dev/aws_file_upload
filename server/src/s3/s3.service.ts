import {
  DeleteObjectCommand,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { config } from '../config';
import { Readable } from 'stream';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  public readonly client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: config.AWS_REGION,
      credentials: {
        accessKeyId: config.ACCESS_KEY_ID!,
        secretAccessKey: config.SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadFile(
    bucket: string,
    key: string,
    fileType: string,
    userEmail: string,
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: fileType,
      Metadata: {
        userEmail,
      },
    });
    const url = await getSignedUrl(this.client, command, { expiresIn: 300 });
    return url;
  }

  async getMetadata(bucket: string, key: string) {
    const command = new HeadObjectCommand({ Bucket: bucket, Key: key });
    const headData = await this.client.send(command);
    return headData.Metadata;
  }

  async getFile(bucket: string, key: string): Promise<Buffer> {
    const command = new GetObjectCommand({ Bucket: bucket, Key: key });
    const response = await this.client.send(command);

    if (!response.Body || !(response.Body instanceof Readable)) {
      throw new Error('Invalid S3 response body');
    }

    const chunks: Buffer[] = [];
    for await (const chunk of response.Body as Readable) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }

    return Buffer.concat(chunks);
  }

  async deleteFile(bucket: string, key: string) {
    const command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
    const response = await this.client.send(command);

    return response;
  }
}
