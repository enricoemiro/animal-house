import { FileTypeValidator, MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';

import { FileNotEmptyValidator } from '@/components/file/file.validator';

export const ImageFilePipe = new ParseFilePipe({
  validators: [
    new FileNotEmptyValidator(),
    new MaxFileSizeValidator({ maxSize: 2000000 }),
    new FileTypeValidator({ fileType: 'jpg|jpeg|png|webp' }),
  ],
});
