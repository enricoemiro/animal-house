import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from '@app/config/env.config';

@Injectable()
export class AwsService {
  private isDev: boolean;
  public readonly s3Client: S3Client;

  public constructor(private configService: ConfigService) {
    this.isDev = this.configService.get('APP_MODE') === Environment.DEVELOPMENT;

    if (!this.isDev) {
      this.s3Client = this.createS3Client();
    }
  }

  /**
   * Create the S3Client instance.
   *
   * @returns the S3Client instance.
   */
  private createS3Client() {
    return new S3Client({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
      },
    });
  }
}
