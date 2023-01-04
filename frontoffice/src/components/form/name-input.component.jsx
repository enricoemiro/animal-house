import { UserIcon } from '@heroicons/react/24/solid';
import { TextInput } from '@mantine/core';

/**
 * @param {import('@mantine/core').TextInputProps} props Props
 */
export const NameInput = (props) => {
  return (
    <TextInput
      withAsterisk
      label="Name"
      placeholder="Name"
      icon={<UserIcon width={16} />}
      {...props}
    />
  );
};
