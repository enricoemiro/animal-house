import { ConfigModuleOptions } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import { IsEnum, IsString, validateSync } from 'class-validator';

import { IsInRange } from '@/common/decorators/is-in-range.decorator';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

class EnvVariables {
  // Node
  @IsString({
    message: 'TZ: Must be a valid string representing the time zone for the application.',
  })
  TZ: string;

  @IsInRange(1, 65535, { message: 'PORT: Must be an integer between 1 and 65535.' })
  PORT: number;

  @IsEnum(Environment, { message: 'NODE_ENV: Must be "development" or "production".' })
  NODE_ENV: Environment;

  // Application
  @IsString({
    message:
      "CORS_ORIGINS: Valid, comma-separated domains must be used. (e.g. 'example.com,mydomain.com')",
  })
  CORS_ORIGINS: string;

  @IsString({ message: 'SESSION_SECRET: Must be a string and cannot be empty.' })
  SESSION_SECRET: string;

  @IsString({
    message:
      "DB_URL: Must be a string containing a valid database connection URL (e.g. 'mongodb://user:password@host:port/database').",
  })
  DB_URL: string;
}

function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    enableDebugMessages: true,
    skipMissingProperties: false,
    stopAtFirstError: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export const configModuleOptions: ConfigModuleOptions = {
  validate,
  isGlobal: true,
  cache: true,
  expandVariables: true,
};
