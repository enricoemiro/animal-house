import { Module } from '@nestjs/common';

import { AwsModule } from '@app/aws/aws.module';

import { FileService } from './file.service';

@Module({
  imports: [AwsModule],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
