import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [PrismaService],
  providers: [DocumentsService],
  controllers: [DocumentsController],
})
export class DocumentsModule {}
