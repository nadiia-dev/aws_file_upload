import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDocumentDto } from './dto/document.dto';
import { Document } from './document.type';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class DocumentsService {
  private s3: S3Client;
  constructor(
    private prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION')!,
      credentials: {
        accessKeyId: this.configService.get<string>('ACCESS_KEY_ID')!,
        secretAccessKey: this.configService.get<string>('SECRET_ACCESS_KEY')!,
      },
    });
  }

  async getUrl({
    fileName,
    fileType,
  }: {
    fileName: string;
    fileType: string;
  }): Promise<{ presignedUrl: string; key: string }> {
    const key = `uploads/${fileName}`;
    const command = new PutObjectCommand({
      Bucket: this.configService.get<string>('S3_BUCKET')!,
      Key: key,
      ContentType: fileType,
    });
    const url = await getSignedUrl(this.s3, command, { expiresIn: 300 });
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
