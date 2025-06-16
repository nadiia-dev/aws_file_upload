import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProducerModule } from './producer/producer.module';
import { ConfigModule } from '@nestjs/config';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ProducerModule,
    ConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
