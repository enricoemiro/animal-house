import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// @ts-expect-error
import helmet from 'helmet';

import { AppModule } from './app.module';
import { sessionOptions } from './config/session';
import { validationPipe } from './config/validation';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  // Nest settings
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(validationPipe);
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGINS').split(','),
    credentials: true,
  });

  // Express middlewares
  app.use(helmet());
  app.use(cookieParser());
  app.use(session(sessionOptions(configService)));

  await app.listen(configService.get<number>('PORT'));
}

bootstrap();
