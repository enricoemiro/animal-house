import { FileValidator } from '@nestjs/common';

export class FileNotEmptyValidator extends FileValidator {
  public constructor() {
    super({});
  }

  public isValid(file?: any): boolean {
    return !!file;
  }

  public buildErrorMessage(): string {
    return 'No file was received.';
  }
}
