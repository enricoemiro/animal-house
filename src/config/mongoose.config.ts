import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  public constructor(private configService: ConfigService) {}

  public async createMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get<string>('DB_URL'),
      connectionFactory: (connection) => {
        connection.plugin(require('mongoose-unique-validator'));
        return connection;
      },
    };
  }
}
