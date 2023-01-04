import { Box, Group, Text, Title } from '@mantine/core';

import { CreatePostButton } from '@/app/board/components/create-post-button.component';
import { Posts } from '@/app/board/components/posts.component';

export const BoardPage = () => {
  return (
    <>
      <Box mb="xl" sx={{ display: 'flex', flexDirection: 'column' }}>
        <Title order={1} color="dark">
          Board
        </Title>

        <Text fz="lg" color="dimmed">
          Connect with animal lovers on our user-friendly bulletin board. Share updates, view posts,
          and join the conversation in our community of pet enthusiasts. Get connected today!
        </Text>
      </Box>

      <Group position="center" spacing="xs" mb="xl">
        <CreatePostButton />
      </Group>

      <Posts />
    </>
  );
};
