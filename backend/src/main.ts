import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppExceptionFilter } from './shared/filters/app-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe()
  );
  app.useGlobalFilters(
    new AppExceptionFilter()
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();