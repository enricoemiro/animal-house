import { ConfigModuleOptions } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

class EnvironmentVariables {
  @IsString()
  APP_NAME: string;

  @IsString()
  @IsEnum(Environment)
  APP_MODE: string;

  @IsNumber()
  APP_PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_DATABASE: string;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_URL: string;

  @IsBoolean()
  NEST_DEBUG: boolean;

  @IsNumber()
  ARGON2_TIME_COST: number;

  @IsNumber()
  ARGON2_HASH_LENGTH: number;

  @IsNumber()
  ARGON2_MEMORY_COST: number;

  @IsNumber()
  ARGON2_PARALLELISM: number;

  @IsString()
  SESSION_NAME: string;

  @IsString()
  SESSION_SECRET: string;

  @IsNumber()
  SESSION_COOKIE_MAXAGE: number;

  @IsString()
  SESSION_STORE_COLLECTIONNAME: string;

  @IsString()
  SESSION_STORE_MONGOURL: string;

  @IsNumber()
  SESSION_STORE_TTL: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    stopAtFirstError: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}

export const configModuleOptions: ConfigModuleOptions = {
  validate,
  expandVariables: true,
  isGlobal: true,
};
