import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@app/app.module';
import {
  i18nValidationExceptionFilter,
  i18nValidationPipe,
} from '@app/config/i18n.config';
import { expressSession } from '@app/config/session.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('v1');
  app.use(expressSession(configService));
  app.useGlobalPipes(i18nValidationPipe);
  app.useGlobalFilters(i18nValidationExceptionFilter);

  await app.listen(configService.get('APP_PORT'));
}

bootstrap();
