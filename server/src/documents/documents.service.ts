import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDocumentDto } from './dto/document.dto';
import { Document } from './document.type';

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async upload(documentData: CreateDocumentDto): Promise<Document> {
    return (await this.prisma.document.create({
      data: documentData,
    })) as Document;
  }

  async list(): Promise<Document[]> {
    return (await this.prisma.document.findMany()) as Document[];
  }
}
