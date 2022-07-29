import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Environment } from '@app/config/env.config';
import { DiskService } from '@app/storage/disk/disk.service';
import { S3Service } from '@app/storage/s3/s3.service';

import { FileOptions } from './file.interface';

@Injectable()
export class FileService {
  private isDev: boolean = undefined;

  public constructor(
    private configService: ConfigService,
    private s3Service: S3Service,
    private diskService: DiskService,
  ) {
    this.isDev = this.configService.get('APP_MODE') === Environment.DEVELOPMENT;
  }

  /**
   * Create a new file.
   *
   * @param fileOptions File options.
   */
  public async create({ path, buffer }: FileOptions) {
    if (this.isDev) {
      return this.diskService.save(path, buffer);
    }

    return this.s3Service.save(path, buffer);
  }

  /**
   * Delete a file.
   *
   * @param obj.path File path.
   */
  public async delete({ path }: Pick<FileOptions, 'path'>) {
    if (this.isDev) {
      return this.diskService.delete(path);
    }

    return this.s3Service.delete(path);
  }
}
