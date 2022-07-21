import { BadRequestException } from '@nestjs/common';

export class HeadOfficeLocationAlreadyExistException extends BadRequestException {
  public constructor() {
    super('headOffice.exception.locationAlreadyExist');
  }
}

export class HeadOfficeNotFoundException extends BadRequestException {
  public constructor() {
    super('headOffice.exception.notFound');
  }
}

export class HeadOfficePhoneAlreadyUsedException extends BadRequestException {
  public constructor() {
    super('headOffice.exception.phoneAlreadyUsed');
  }
}

export class HeadOfficeLocationDoesNotMatchException extends BadRequestException {
  public constructor() {
    super('headOffice.exception.locationDoesNotMatch');
  }
}

export class HeadOfficeEmptyIdException extends BadRequestException {
  public constructor() {
    super('headOffice.exception.emptyId');
  }
}
export class HeadOfficeNotDeletedException extends BadRequestException {
  public constructor() {
    super('headOffice.exception.notDeleted');
  }
}
