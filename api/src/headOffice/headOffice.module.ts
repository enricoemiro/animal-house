import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PaginateModule } from '@app/paginate/paginate.module';

import { HeadOfficeController } from './headOffice.controller';
import { HeadOffice, HeadOfficeSchema } from './headOffice.schema';
import { HeadOfficeService } from './headOffice.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HeadOffice.name,
        schema: HeadOfficeSchema,
      },
    ]),
    PaginateModule,
  ],
  controllers: [HeadOfficeController],
  providers: [HeadOfficeService],
  exports: [HeadOfficeService],
})
export class HeadOfficeModule {}
