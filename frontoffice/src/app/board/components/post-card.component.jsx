import { Box, Group, Paper, Text } from '@mantine/core';
import { Badge } from '@mantine/core';
import { format } from 'date-fns';

import { useAuth } from '@/app/auth/use-auth.hook';
import { Avatar } from '@/components/avatar.component';
import { ImageViewer } from '@/components/layouts/image-viewer.component';

import { DeletePostButton } from './delete-post-button.component';

export const PostCard = ({ post }) => {
  const {
    meQuery: { data: user },
  } = useAuth();

  return (
    <Paper radius="md" p="md" shadow="xs">
      <Group spacing="sm" position="apart">
        <Group spacing="xs">
          <Avatar name={post.user.name} />

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Text size="sm" weight={500}>
              {post.user.name}
            </Text>

            <Text size="xs" color="dimmed">
              {format(new Date(post.createdAt), 'PPPpp')}
            </Text>
          </Box>
        </Group>

        {post.userId === user?.id && <DeletePostButton postId={post.id} />}
      </Group>

      <Box
        mt="sm"
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          gap: theme.spacing.xs,
        })}
      >
        {post.images?.length > 0 && <ImageViewer images={post.images} />}
        <Text size="sm">{post.content}</Text>
        {post.category !== null && <Badge>{post.category}</Badge>}
      </Box>
    </Paper>
  );
};
