import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConsumerModule } from './consumer/consumer.module';
import { DocumentsModule } from './documents/documents.module';
import { ConsumerService } from './consumer/consumer.service';
import { S3Service } from './s3/s3.service';
import { ParserService } from './parser/parser.service';
import { S3Module } from './s3/s3.module';
import { ParserModule } from './parser/parser.module';
import { SearchService } from './search/search.service';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConsumerModule,
    DocumentsModule,
    S3Module,
    ParserModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConsumerService, S3Service, ParserService, SearchService],
})
export class AppModule {}
