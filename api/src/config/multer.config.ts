import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModuleAsyncOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { memoryStorage } from 'multer';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createMulterOptions(): Promise<MulterOptions> {
    return {
      storage: memoryStorage(),
      fileFilter: (_req, file, cb) => {
        if (file.mimetype.split('/')[0] === 'image') {
          return cb(null, true);
        }

        return cb(new BadRequestException('Only images are allowed'), false);
      },
    };
  }
}

export const multerModuleOptions: MulterModuleAsyncOptions = {
  useClass: MulterConfigService,
};
