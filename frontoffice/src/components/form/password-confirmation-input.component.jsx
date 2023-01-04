import { PasswordInput } from './password-input.component';

/**
 * @param {import('@mantine/core').PasswordInputProps} props Props
 */
export const PasswordConfirmationInput = (props) => {
  return (
    <PasswordInput
      withAsterisk
      label="Password confirmation"
      placeholder="Password confirmation"
      {...props}
    />
  );
};
