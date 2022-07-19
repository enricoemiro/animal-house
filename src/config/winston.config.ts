import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WinstonModuleOptionsFactory, utilities } from 'nest-winston';
import { LoggerOptions, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { Environment } from './env.config';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  private APP_MODE;

  public constructor(private configService: ConfigService) {
    this.APP_MODE = this.configService.get('APP_MODE');
  }

  public async createWinstonModuleOptions(): Promise<LoggerOptions> {
    return {
      transports: this.createTransports(),
    };
  }

  private createTransports() {
    const transports = [];

    if (this.APP_MODE === Environment.DEVELOPMENT) {
      transports.push(this.createConsoleTransport());
    }

    if (this.APP_MODE === Environment.PRODUCTION) {
      transports.push(this.createDailyFileTransport());
    }

    return transports;
  }

  private createConsoleTransport() {
    const { Console } = transports;
    const { combine, ms, timestamp } = format;

    return new Console({
      format: combine(
        timestamp(),
        ms(),
        utilities.format.nestLike('Winston', {
          prettyPrint: true,
        }),
      ),
    });
  }

  private createDailyFileTransport() {
    return new DailyRotateFile({
      level: 'error',
      dirname: './logs/error',
      filename: '%DATE%.log',
      datePattern: 'YYYY-MM-DDTHH:mm:ss.SSSZZ',
      zippedArchive: true,
      maxSize: '64m',
      maxFiles: '7d',
    });
  }
}
