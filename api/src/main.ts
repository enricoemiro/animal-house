import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { AppModule } from './app.module';
import { AuthGuard } from './app/auth/auth.guard';
import { PrismaService } from './config/prisma/prisma.service';
import { validationPipe } from './config/validation.config';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const httpAdapterHost = app.get(HttpAdapterHost);
  const reflector = app.get(Reflector);

  // Nest settings
  app.useGlobalGuards(new AuthGuard(reflector));
  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new GlobalExceptionFilter(httpAdapterHost));
  app.enableCors({
    origin: 'https://site212245.tw.cs.unibo.it',
    credentials: true,
  });

  // Enable shutdown hook
  // See: https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Express middlewares
  app.use(cookieParser());
  app.use(
    session({
      name: 'sid',
      store: MongoStore.create({
        collectionName: 'sessions',
        mongoUrl: 'INSERIRE_QUI_URL_DI_MONGO',
        stringify: false,
      }),
      secret: 'ztXUdhZWJ2tTJenyt4zZdi160fSkG0T1',
      resave: false,
      saveUninitialized: false,
      unset: 'destroy',
      cookie: {
        secure: true,
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: 'lax',
      },
    }),
  );

  await app.listen(8000);
}

bootstrap();
