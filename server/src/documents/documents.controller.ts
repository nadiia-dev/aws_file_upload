import { Body, Controller, Get, Post } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Post('/upload')
  uploadDocument(@Body() body: CreateDocumentDto) {
    return this.documentsService.upload(body);
  }

  @Get()
  listDocuments() {
    return this.documentsService.list();
  }
}
