import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'node:fs';
import { unlink, writeFile } from 'node:fs/promises';

import { AwsService } from '@app/aws/aws.service';
import { Environment } from '@app/config/env.config';
import { extractPath } from '@app/utils/helpers';

import { FileOptions } from './file.interface';

@Injectable()
export class FileService {
  private isDev: boolean = undefined;

  public constructor(
    private configService: ConfigService,
    private awsService: AwsService,
  ) {
    this.isDev = this.configService.get('APP_MODE') === Environment.DEVELOPMENT;
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
   * Delete a file.
   *
   * @param obj.path File path.
   */
  public async delete({ path }: Pick<FileOptions, 'path'>) {
    if (this.isDev) {
      return this.deleteFromDisk(path);
    }

    return this.deleteFromS3(path);
  }

  /**
   * Save a file inside the S3 bucket.
   *
   * @param obj.path File path.
   * @param obj.buffer File buffer.
   * @returns the file created.
   */
  private async saveToS3({ path, buffer }: FileOptions) {
    return this.awsService.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: path,
        Body: buffer,
      }),
    );
  }

  /**
   * Save a file in the disk storage.
   *
   * @param obj.path File path.
   * @param obj.buffer File buffer.
   */
  private async saveToDisk({ path, buffer }: FileOptions) {
    const { dirname } = extractPath(path);

    if (!existsSync(dirname)) {
      mkdirSync(dirname, { recursive: true });
    }

    return writeFile(path, buffer);
  }

  /**
   * Delete a file from the disk storage.
   *
   * @param path File path.
   */
  private async deleteFromDisk(path: string) {
    try {
      return await unlink(path);
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.log(error);
      }

      throw error;
    }
  }

  /**
   * Delete a file from the s3 storage.
   *
   * @param path File path.
   */
  private async deleteFromS3(path: string) {
    return this.awsService.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Key: path,
      }),
    );
  }
}
