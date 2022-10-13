import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import mongooseUniqueValidator from 'mongoose-unique-validator';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  public constructor(private configService: ConfigService) {}

  public async createMongooseOptions(): Promise<MongooseModuleOptions> {
    return {
      uri: this.configService.get<string>('DB_URL'),
      connectionFactory: (connection) => {
        connection.plugin(mongooseUniqueValidator);
        connection.plugin(mongoosePaginateV2);
        return connection;
      },
    };
  }
}
