import { Carousel } from '@mantine/carousel';
import { Box, Group, Image, Paper, Text } from '@mantine/core';
import { Badge } from '@mantine/core';
import { format } from 'date-fns';
import uuid from 'react-uuid';

import { useAuth } from '@/app/auth/use-auth.hook';
import { Avatar } from '@/components/avatar.component';
import { bufferToBase64 } from '@/utils/image';

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
        {post.images?.length > 0 && (
          <Carousel
            mx="auto"
            loop
            withControls={post.images.length > 1}
            withIndicators={post.images.length > 1}
          >
            {post.images.map((image) => {
              return (
                <Carousel.Slide key={uuid()}>
                  <Image
                    radius="md"
                    src={`data:image/png;base64,` + bufferToBase64(image.content.data)}
                  />
                </Carousel.Slide>
              );
            })}
          </Carousel>
        )}

        <Text size="sm">{post.content}</Text>

        {post.category !== null && <Badge>{post.category}</Badge>}
      </Box>
    </Paper>
  );
};
