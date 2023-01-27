import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsMatchPattern(pattern: RegExp, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isValidPattern',
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `The ${propertyName} field is invalid`,
        ...validationOptions,
      },
      validator: {
        validate(value: string) {
          return typeof value === 'string' && new RegExp(pattern).test(value);
        },
      },
    });
  };
}
