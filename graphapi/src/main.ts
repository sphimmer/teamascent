import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';
// import { ConnectionManager, createConnection } from 'typeorm';
import { DBConnector } from './db_connection';

async function bootstrap() {
  await DBConnector.getConnection();
  const app = await NestFactory.create(AppModule, { logger: ['verbose'] });
  await app.listen(3000);
}
bootstrap();
