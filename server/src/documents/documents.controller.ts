import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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

  @Delete('/:id')
  deleteDocument(@Param('id') id: string) {
    return this.documentsService.delete(Number(id));
  }

  @Get('/search')
  searchDocuments(@Query() query: { searchQuery: string }) {
    return this.documentsService.search(query.searchQuery);
  }
}
