import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDocumentDto } from './dto/document.dto';
import { Document } from './document.type';
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
    const url = await this.s3.uploadFile(config.S3_BUCKET!, key, fileType);
    return { presignedUrl: url, key };
  }

  async upload(documentData: CreateDocumentDto): Promise<Document> {
    return await this.prisma.document.create({
      data: documentData,
    });
  }

  async list(email: string): Promise<Document[]> {
    return (await this.prisma.document.findMany({
      where: { userEmail: email },
    })) as Document[];
  }

  async delete(id: number) {
    try {
      const document = await this.prisma.document.findUnique({ where: { id } });

      if (!document) {
        throw new Error('Document not found');
      }

      const key = `uploads/${document.filename}`;
      const res = await this.s3.deleteFile(config.S3_BUCKET!, key);

      const isSuccess =
        res.DeleteMarker === true ||
        res.$metadata?.httpStatusCode === 204 ||
        res.$metadata?.httpStatusCode === 200;

      if (!isSuccess) {
        throw new Error('Failed to delete file from S3');
      }

      return await this.prisma.document.delete({ where: { id } });
    } catch (e) {
      console.error('Error while deleting document:', e);
      throw new Error('Document deletion failed');
    }
  }
}
