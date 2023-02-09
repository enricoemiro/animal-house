import { Center, SimpleGrid } from '@mantine/core';

import { CreatePostButton } from '@/app/board/components/create-post-button.component';
import { Posts } from '@/app/board/components/posts.component';
import { PageHeader } from '@/components/layouts/page-header.component';

export const BoardPage = () => {
  return (
    <SimpleGrid spacing="md">
      <PageHeader
        title="Board"
        subtitle="Connect with animal lovers on our user-friendly bulletin board. Share updates, view posts, and join the conversation in our community of pet enthusiasts. Get connected today!"
      />

      <Center>
        <CreatePostButton />
      </Center>

      <Posts />
    </SimpleGrid>
  );
};
