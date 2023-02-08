import { Select } from '@mantine/core';

/**
 * @param {import('@mantine/core').SelectProps} props Props
 */
export const PostCategoryInput = (props) => {
  return (
    <Select
      searchable
      nothingFound="No options"
      label="Category"
      placeholder="Category"
      data={[
        { value: 'HERE_IT_IS', label: 'Here It Is' },
        { value: 'HELP_ME', label: 'Help Me' },
        { value: 'LOOKING_FOR_PARTNER', label: 'Looking for Partner' },
      ]}
      clearable
      clearButtonLabel="Clear category field"
      {...props}
    />
  );
};
