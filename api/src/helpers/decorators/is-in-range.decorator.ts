import { ValidationArguments, ValidationOptions, registerDecorator } from 'class-validator';

export function IsInRange(min: number, max: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isInRange',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [min, max],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return value >= args.constraints[0] && value <= args.constraints[1];
        },
      },
    });
  };
}
