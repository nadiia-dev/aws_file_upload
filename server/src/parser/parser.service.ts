import { Injectable } from '@nestjs/common';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';

interface PdfParseResult {
  numpages: number;
  numrender: number;
  info: any;
  metadata: any;
  text: string;
  version: string;
}

@Injectable()
export class ParserService {
  async parsePdf(buffer: Buffer): Promise<string> {
    const data = (await pdf(buffer)) as PdfParseResult;
    return data.text;
  }

  async parseDocx(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }
}
