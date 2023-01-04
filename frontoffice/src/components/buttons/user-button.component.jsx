import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { Box, Group, Text, UnstyledButton } from '@mantine/core';
import { forwardRef } from 'react';

import { Avatar } from '@/components/avatar.component';

/**
 * @param {Object} props - Props
 * @param {string} props.name - User name
 * @param {string} props.email - User email
 */
export const UserButton = forwardRef(({ name, email, ...others }, ref) => {
  return (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
      {...others}
    >
      <Group spacing={10}>
        <Avatar name={name} />

        <Box
          sx={(theme) => ({
            flex: 1,
            [theme.fn.smallerThan('md')]: {
              display: 'none',
            },
          })}
        >
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </Box>

        <ChevronDownIcon width={16} />
      </Group>
    </UnstyledButton>
  );
});
