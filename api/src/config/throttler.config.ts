import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ThrottlerModuleOptions,
  ThrottlerOptionsFactory,
} from '@nestjs/throttler';

import { Environment } from './env.config';

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
  public constructor(private configService: ConfigService) {}

  public async createThrottlerOptions(): Promise<ThrottlerModuleOptions> {
    if (this.configService.get<string>('APP_MODE') !== Environment.PRODUCTION)
      return {};

    return {
      ttl: this.configService.get<number>('THROTTLE_TTL'),
      limit: this.configService.get<number>('THROTTLE_LIMIT'),
    };
  }
}
