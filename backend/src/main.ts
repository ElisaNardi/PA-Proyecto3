import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { AppExceptionFilter } from './shared/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL', 'http://localhost:5173')
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  
  app.useGlobalFilters(
    new AppExceptionFilter()
  );

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();