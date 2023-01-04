import { Button } from '@mantine/core';

/**
 * @param {import('@mantine/core').ButtonProps & { children: React.ReactNode }} props Props
 */
export const SubmitButton = ({ children, ...others }) => {
  return (
    <Button type="submit" uppercase sx={{ fontWeight: 'bold' }} {...others}>
      {children}
    </Button>
  );
};
