import {
  MailerModuleOptions,
  MailerTransportFactory,
} from '@enricoemiro/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailerConfigService implements MailerTransportFactory {
  public constructor(private configService: ConfigService) {}

  public async createMailerModuleOptions(): Promise<MailerModuleOptions> {
    return {
      transports: [
        {
          name: 'mailtrap',
          transport: {
            host: this.configService.get<string>('MAIL_HOST'),
            port: this.configService.get<number>('MAIL_PORT'),
            auth: {
              user: this.configService.get<string>('MAIL_USER'),
              pass: this.configService.get<string>('MAIL_PASS'),
            },
          },
          defaults: {
            from: {
              name: this.configService.get<string>('MAIL_FROM_NAME'),
              address: this.configService.get<string>('MAIL_FROM_ADDRESS'),
            },
          },
        },
      ],
    };
  }
}
