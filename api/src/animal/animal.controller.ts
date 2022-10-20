import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { I18nService } from 'nestjs-i18n';

import { RequiresPermissions } from '@app/acl/acl.decorator';
import { RequiresAuth } from '@app/auth/auth.decorator';
import { ImageType } from '@app/image/image.interface';
import { ImageFilePipe } from '@app/image/image.pipe';
import { ImageService } from '@app/image/image.service';
import { PaginateDto } from '@app/paginate/paginate.dto';
import { PermissionName } from '@app/permission/permission.schema';
import { UserService } from '@app/user/user.service';

import { AnimalCreateDto, AnimalUpdateDto } from './animal.dto';
import { AnimalService } from './animal.service';

type AnimalDeleteDto = AnimalUpdateDto;
type AnimalUpdatePictureDto = AnimalUpdateDto;

@Controller('animal')
@RequiresAuth(true)
export class AnimalController {
  public constructor(
    private animalService: AnimalService,
    private i18nService: I18nService,
    private userService: UserService,
    private imageService: ImageService,
  ) {}

  public onModuleInit() {}

  @Post('create')
  @RequiresPermissions(PermissionName.ANIMAL_CREATE)
  public async createAnimal(@Body() animalCreateDto: AnimalCreateDto) {
    await this.userService.findById(animalCreateDto.ownerId);

    await this.animalService.create(animalCreateDto);

    return {
      message: this.i18nService.t('animal.controller.createAnimal'),
    };
  }

  @Get('read')
  @HttpCode(HttpStatus.OK)
  public async read(@Body() { page, limit }: PaginateDto) {
    return await this.animalService.paginate(page, limit);
  }

  @Post('update')
  @RequiresPermissions(PermissionName.ANIMAL_UPDATE)
  public async updateAnimal(@Body() animalUpdateDto: AnimalUpdateDto) {
    if (animalUpdateDto.ownerId) {
      await this.userService.findById(animalUpdateDto.ownerId);
    }

    await this.animalService.update(
      { _id: animalUpdateDto.id },
      animalUpdateDto,
    );

    return {
      message: this.i18nService.t('animal.controller.updateAnimal'),
    };
  }

  @Post('update/picture')
  @UseInterceptors(FileInterceptor('picture'))
  public async updateAnimalPicture(
    @Body() { id }: AnimalUpdatePictureDto,
    @UploadedFile(ImageFilePipe) picture: Express.Multer.File,
  ) {
    const animal = await this.animalService.findById(id);

    await this.imageService.create({
      ownerId: animal._id,
      type: ImageType.ANIMAL,
      buffer: picture.buffer,
    });

    return {
      message: this.i18nService.t('animal.controller.updateAnimalPicture'),
    };
  }

  @Post('delete')
  @RequiresPermissions(PermissionName.ANIMAL_DELETE)
  public async deleteAnimal(@Body() animalDeleteDto: AnimalDeleteDto) {
    const animal = await this.animalService.findById(animalDeleteDto.id);

    await this.animalService.delete({ _id: animal._id });

    return {
      message: this.i18nService.t('animal.controller.deleteAnimal', {
        args: {
          name: animal.name,
        },
      }),
    };
  }

  @Post('delete/picture')
  @RequiresPermissions(PermissionName.ANIMAL_DELETE)
  public async deleteAnimalPicture(@Body() { id }: AnimalDeleteDto) {
    await this.animalService.findById(id);

    await this.imageService.delete({ ownerId: id, type: ImageType.ANIMAL });

    return {
      message: this.i18nService.t('animal.controller.deleteAnimalPicture'),
    };
  }
}
