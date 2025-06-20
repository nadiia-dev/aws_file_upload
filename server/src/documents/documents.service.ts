import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDocumentDto } from './dto/document.dto';
import { Document } from './document.type';
import { S3Service } from 'src/s3/s3.service';
import { config } from 'src/config';
import { SearchService } from 'src/search/search.service';

@Injectable()
export class DocumentsService {
  constructor(
    private prisma: PrismaService,
    private readonly s3: S3Service,
    private readonly searchService: SearchService,
  ) {}

  async getUrl({
    fileName,
    fileType,
    userEmail,
  }: {
    fileName: string;
    fileType: string;
    userEmail: string;
  }): Promise<{ presignedUrl: string; key: string }> {
    const timestamp = Date.now();
    const key = `uploads/${timestamp}_${fileName}`;
    const url = await this.s3.uploadFile(
      config.S3_BUCKET!,
      key,
      fileType,
      userEmail,
    );
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

      const res = await this.s3.deleteFile(
        config.S3_BUCKET!,
        document.objectKey!,
      );

      const isSuccess =
        res.DeleteMarker === true ||
        res.$metadata?.httpStatusCode === 204 ||
        res.$metadata?.httpStatusCode === 200;

      if (!isSuccess) {
        throw new Error('Failed to delete file from S3');
      }

      const opensearchId = await this.searchService.getDocumentId(
        'documents',
        document.objectKey!,
      );
      if (!opensearchId) {
        throw new Error('No such document');
      }

      await this.searchService.deleteDocument('documents', opensearchId);

      return await this.prisma.document.delete({ where: { id } });
    } catch (e) {
      console.error('Error while deleting document:', e);
      throw new Error('Document deletion failed');
    }
  }

  async search(query: string, userEmail: string) {
    const res = await this.searchService.search('documents', query, userEmail);
    return res;
  }
}
