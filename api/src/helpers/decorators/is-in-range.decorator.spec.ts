import { validate } from 'class-validator';

import { IsInRange } from './is-in-range.decorator';

describe('IsInRange', () => {
  class TestClass {
    @IsInRange(1, 10)
    value: number;
  }

  /**
   * Validates the value property of the TestClass using the IsInRange decorator and the validate
   * function from class-validator.
   *
   * @param value The value to be validated.
   * @returns A boolean indicating if the value is valid (i.e. within the range specified by the
   * IsInRange decorator).
   */
  const validateValue = async (value: number) => {
    const testClass = new TestClass();
    testClass.value = value;
    const errors = await validate(testClass);
    return errors.length === 0;
  };

  it('should allow values in the specified range.', async () => {
    expect(await validateValue(5)).toBe(true);
    expect(await validateValue(1)).toBe(true);
    expect(await validateValue(10)).toBe(true);
  });

  it('should not allow values outside the specified range.', async () => {
    expect(await validateValue(0)).toBe(false);
    expect(await validateValue(11)).toBe(false);
  });
});
