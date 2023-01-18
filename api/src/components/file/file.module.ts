import { Module } from '@nestjs/common';

import { DiskModule } from '@/components/storage/disk/disk.module';
import { S3Module } from '@/components/storage/s3/s3.module';

import { FileService } from './file.service';

@Module({
  imports: [S3Module, DiskModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
