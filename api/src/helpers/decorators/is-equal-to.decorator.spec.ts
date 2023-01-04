import { ValidationError } from '@nestjs/common';
import { validate } from 'class-validator';

import { IsEqualTo } from './is-equal-to.decorator';

describe('IsEqualTo decorator', () => {
  class TestClass {
    property: string;

    @IsEqualTo('property')
    otherProperty: string;
  }

  const validateValue = async (
    property: string,
    otherProperty: string,
  ): Promise<ValidationError[]> => {
    const testClass = new TestClass();
    testClass.property = property;
    testClass.otherProperty = otherProperty;
    const errors = await validate(testClass);
    return errors;
  };

  it('should return no errors if properties are equal.', async () => {
    expect(await validateValue('value', 'value')).toStrictEqual([]);
  });

  it('should return an error if properties are not equal.', async () => {
    const errors = await validateValue('value', 'differentValue');

    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toEqual({
      isEqualTo: 'otherProperty must be equal to property.',
    });
  });
});
