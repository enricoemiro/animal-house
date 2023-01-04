import { Avatar as MantineAvatar } from '@mantine/core';
import initials from 'initials';

export const Avatar = ({ name, ...others }) => {
  return (
    <MantineAvatar variant="filled" radius="xl" size="md" color="dark" {...others}>
      {initials(name)}
    </MantineAvatar>
  );
};
