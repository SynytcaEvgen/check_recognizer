import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigModule } from '@nestjs/config';
import { LoggerProvider } from './service/index';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, GoogleGenerativeAI, LoggerProvider],
})
export class AppModule {}
