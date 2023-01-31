import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
// import { ConnectionManager, createConnection } from 'typeorm';
import { DBConnector } from './db_connection';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  await DBConnector.getConnection();
  const app = await NestFactory.create(AppModule, { logger: ['verbose'] });
  app.enableCors({
    credentials: true,
    origin: '*',
  });
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
