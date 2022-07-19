import { ValidationPipe } from '@nestjs/common';
import {
  I18nOptions,
  I18nValidationError,
  I18nValidationExceptionFilter,
} from 'nestjs-i18n';
import { i18nValidationErrorFactory } from 'nestjs-i18n';
import { join } from 'path';

export const i18nModuleOptions: I18nOptions = {
  fallbackLanguage: 'en',
  loaderOptions: {
    path: join(__dirname, '/../i18n/'),
    watch: true,
  },
};

export const i18nValidationPipe = new ValidationPipe({
  transform: true, // automatically transforms objects to match their dto
  whitelist: true, // automatically remove non-whitelisted properties
  exceptionFactory: i18nValidationErrorFactory,
});

export const i18nValidationExceptionFilter = new I18nValidationExceptionFilter({
  errorFormatter(errors: I18nValidationError[]) {
    const formattedErrors: any = {};

    errors.forEach(({ property, constraints }) => {
      formattedErrors[property] = Object.values<string>(constraints);
    });

    return formattedErrors;
  },
});
