import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaService } from 'src/prisma.service';
import { S3Module } from 'src/s3/s3.module';
import { SearchService } from 'src/search/search.service';

@Module({
  imports: [S3Module],
  providers: [DocumentsService, PrismaService, SearchService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
