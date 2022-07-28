import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';

import { Environment } from '@app/config/env.config';
import { extractPath } from '@app/utils/helpers';

import { FileOptions } from './file.interface';

@Injectable()
export class FileService {
  private isDev: boolean = undefined;
  private s3Client: S3Client = undefined;

  public constructor(private configService: ConfigService) {
    this.isDev = this.configService.get('APP_MODE') === Environment.DEVELOPMENT;

    if (!this.isDev) {
      this.s3Client = this.createS3Client();
    }
  }

  /**
   * Create a new file.
   *
   * @param fileOptions File options.
   */
  public async create(fileOptions: FileOptions) {
    if (this.isDev) {
      return this.saveToDisk(fileOptions);
    }

    return this.saveToS3(fileOptions);
  }

  /**
   * Save a file inside the S3 bucket.
   *
   * @param obj.path File path.
   * @param obj.buffer File buffer.
   * @returns the file created.
   */
  private async saveToS3({ path, buffer }: FileOptions) {
    try {
      return await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.configService.get('AWS_BUCKET_NAME'),
          Key: path,
          Body: buffer,
        }),
      );
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Save a file in the disk storage.
   *
   * @param obj.path File path.
   * @param obj.buffer File buffer.
   */
  private async saveToDisk({ path, buffer }: FileOptions) {
    try {
      const { dirname } = extractPath(path);

      if (!existsSync(dirname)) {
        mkdirSync(dirname, { recursive: true });
      }

      return await writeFile(path, buffer);
    } catch (error: any) {
      throw error;
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
