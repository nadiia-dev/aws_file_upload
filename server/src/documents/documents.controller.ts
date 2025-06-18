import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Post('/generate-presigned-url')
  getUrl(@Body() body: { fileName: string; fileType: string }) {
    return this.documentsService.getUrl(body);
  }

  @Post('/upload')
  uploadDocument(@Body() body: CreateDocumentDto) {
    return this.documentsService.upload(body);
  }

  @Get()
  listDocuments(@Query() query: { email: string }) {
    return this.documentsService.list(query.email);
  }
}
