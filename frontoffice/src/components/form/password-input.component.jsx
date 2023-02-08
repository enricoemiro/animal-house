import { LockClosedIcon } from '@heroicons/react/24/solid';
import { PasswordInput as MantinePasswordInput } from '@mantine/core';

/**
 * @param {import('@mantine/core').PasswordInputProps} props Props
 */
export const PasswordInput = (props) => {
  return (
    <MantinePasswordInput
      withAsterisk
      label="Password"
      placeholder="Password"
      icon={<LockClosedIcon width={16} />}
      {...props}
    />
  );
};
