import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDocumentDto } from './dto/document.dto';
import { Document } from './document.type';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Service } from 'src/s3/s3.service';
import { config } from 'src/config';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private readonly s3: S3Service,
  ) {}

  async getUrl({
    fileName,
    fileType,
  }: {
    fileName: string;
    fileType: string;
  }): Promise<{ presignedUrl: string; key: string }> {
    const key = `uploads/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: config.S3_BUCKET!,
      Key: key,
      ContentType: fileType,
    });
    const url = await getSignedUrl(this.s3.client, command, { expiresIn: 300 });
    return { presignedUrl: url, key };
  }

  async upload(documentData: CreateDocumentDto): Promise<Document> {
    return await this.prisma.document.create({
      data: documentData,
    });
  }

  async list(): Promise<Document[]> {
    return (await this.prisma.document.findMany()) as Document[];
  }
}
