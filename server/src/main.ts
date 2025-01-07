import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LoggerProvider } from './service/index';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { urlencoded, json } from 'express';
import { useContainer } from 'class-validator';
import helmet from 'helmet';

async function start() {
  const PORT = process.env.PORT || 3000;
  const logger = new LoggerProvider();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    logger,
    rawBody: true,
  });

  app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
  app.use(helmet.hidePoweredBy()); //change value of X-Powered-By header to given value
  app.use(helmet.noSniff()); // set X-Content-Type-Options header
  app.use(helmet.frameguard()); // set X-Frame-Options header
  app.use(helmet.xssFilter()); // set X-XSS-Protection header

  app.use(json({ limit: process.env.MAX_PAYLOAD_SIZE || '256kb' }));
  app.use(
    urlencoded({
      extended: true,
      limit: process.env.MAX_PAYLOAD_SIZE || '256kb',
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('CheckRecognizer')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Synytsia Yevhen')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(PORT);

  logger.log(`API is running on port ${PORT} 🚀`, 'NestApplication');
}
start();
