import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export const validationPipe = new ValidationPipe({
  transform: true, // automatically transforms objects to match their dto
  whitelist: true, // automatically remove non-whitelisted properties
  exceptionFactory: (errors: ValidationError[]) => {
    const formattedErrors: any = {};

    errors.forEach(({ property, constraints }) => {
      formattedErrors[property] = Object.values<string>(constraints);
    });

    return new BadRequestException({ validationErrors: formattedErrors });
  },
});
