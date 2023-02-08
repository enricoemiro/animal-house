import { Textarea } from '@mantine/core';

/**
 * @param {import('@mantine/core').TextareaProps} props - Props
 */
export const ContentInput = (props) => {
  return (
    <Textarea withAsterisk label="Content" placeholder="What's happening?" minRows={5} {...props} />
  );
};
