import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AppLogger } from './common/logger/logger';
import { NODE_ENV, PORT } from './config/env.config';
import { setupSwagger } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.disable('x-powered-by');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  setupSwagger(app);
  app.enableCors();
  await app.listen(3000);
  AppLogger.verbose(
    `Nest App started on ${NODE_ENV} environment with port ${PORT}`,
  );
}
bootstrap();
