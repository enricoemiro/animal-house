import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ImageModule } from '@app/image/image.module';
import { PaginateModule } from '@app/paginate/paginate.module';
import { UserModule } from '@app/user/user.module';

import { AnimalController } from './animal.controller';
import { Animal, AnimalSchema } from './animal.schema';
import { AnimalService } from './animal.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Animal.name,
        schema: AnimalSchema,
      },
    ]),
    PaginateModule,
    UserModule,
    ImageModule,
  ],
  controllers: [AnimalController],
  providers: [AnimalService],
})
export class AnimalModule {}
