import { Module } from '@nestjs/common';

import { DiskModule } from '@app/storage/disk/disk.module';
import { S3Module } from '@app/storage/s3/s3.module';

import { FileService } from './file.service';

@Module({
  imports: [S3Module, DiskModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
