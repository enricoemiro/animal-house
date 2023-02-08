import { AtSymbolIcon } from '@heroicons/react/24/solid';
import { TextInput } from '@mantine/core';

/**
 * @param {import('@mantine/core').TextInputProps} props Props
 */
export const EmailInput = (props) => {
  return (
    <TextInput
      withAsterisk
      label="Email"
      placeholder="Email"
      icon={<AtSymbolIcon width={16} />}
      {...props}
    />
  );
};
