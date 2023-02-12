import { Flex, Text, useMantineTheme } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Masonry from 'react-smart-masonry';

import { GET_POSTS, getPosts } from '@/app/board/api/get-posts.api';
import { CursorPagination } from '@/components/layouts/cursor-pagination.component';

import { PostCard } from './post-card.component';

export const Posts = () => {
  const theme = useMantineTheme();
  const [cursor, setCursor] = useState({});

  const {
    data: { posts, meta },
    refetch,
  } = useQuery({
    queryKey: [GET_POSTS],
    queryFn: () => getPosts(cursor),
    initialData: { posts: [], meta: {} },
    retry: false,
  });

  useEffect(() => {
    refetch();
  }, [cursor]);

  return (
    <Flex direction="column">
      <Flex direction="column" sx={(theme) => ({ marginBottom: theme.spacing.md })}>
        {posts.length === 0 && (
          <Text align="center">It looks like nobody has written anything yet. Be the first!</Text>
        )}

        {posts.length > 0 && (
          <Masonry
            autoArrange={true}
            breakpoints={{ xs: theme.breakpoints.xs, md: theme.breakpoints.md }}
            columns={{ xs: 1, md: 3 }}
            gap={theme.spacing.md}
          >
            {posts.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })}
          </Masonry>
        )}
      </Flex>

      <CursorPagination
        onPreviousPage={() => setCursor({ before: meta?.startCursor })}
        onNextPage={() => setCursor({ after: meta?.endCursor })}
        {...meta}
      />
    </Flex>
  );
};
