import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './interceptors/handleError.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import compression from 'compression';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: process.env.FE_ORIGIN,
    methods: 'GET,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, ClientPath, Authorization',
    credentials: true,
  });
  app.use(compression());
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Employee Management API')
    .setDescription('API documentation for managing employees and leaves')
    .setVersion('1.0')
    .addTag('employee')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
