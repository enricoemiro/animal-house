import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common';

import { FileNotEmptyValidator } from '@app/file/file.validator';

export const ImageFilePipe = new ParseFilePipe({
  validators: [
    new FileNotEmptyValidator(),
    new MaxFileSizeValidator({ maxSize: 1024000 }),
    new FileTypeValidator({ fileType: 'jpg|jpeg|png|webp' }),
  ],
});
