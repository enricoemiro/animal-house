import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
// @ts-expect-error
import helmet from 'helmet';

import { AppModule } from './app.module';
import { AuthGuard } from './app/auth/auth.guard';
import { PrismaService } from './config/prisma/prisma.service';
import { sessionOptions } from './config/session.config';
import { validationPipe } from './config/validation.config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);

  // Nest settings
  app.setGlobalPrefix('/api/v1');
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGINS').split(','),
    credentials: true,
  });

  // Enable shutdown hook
  // See: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Express middlewares
  app.use(helmet());
  app.use(cookieParser());
  app.use(session(sessionOptions(configService)));

  await app.listen(configService.get<number>('PORT'));
}

bootstrap();
