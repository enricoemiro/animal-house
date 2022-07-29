import { BadRequestException } from '@nestjs/common';

export class DiskFileNotFound extends BadRequestException {
  public constructor() {
    super('disk.exception.fileNotFound');
  }
}
