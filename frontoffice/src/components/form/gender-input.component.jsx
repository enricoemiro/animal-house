import { Select } from '@mantine/core';

/**
 * @param {import('@mantine/core').SelectProps} props Props
 */
export const GenderInput = (props) => {
  return (
    <Select
      searchable
      nothingFound="No options"
      label="Gender"
      placeholder="Gender"
      data={[
        { value: 'MALE', label: 'Male' },
        { value: 'FEMALE', label: 'Female' },
        { value: 'PREFER_NOT_TO_SAY', label: 'Prefer not to say' },
      ]}
      clearable
      clearButtonLabel="Clear gender field"
      {...props}
    />
  );
};
