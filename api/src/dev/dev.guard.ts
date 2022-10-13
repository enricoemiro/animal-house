import { CanActivate, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from '@app/config/env.config';

@Injectable()
export class DevGuard implements CanActivate {
  public constructor(private configService: ConfigService) {}

  public canActivate(): boolean {
    const appMode = this.configService.get('APP_MODE');

    if (appMode !== Environment.DEVELOPMENT) {
      throw new NotFoundException();
    }

    return true;
  }
}
