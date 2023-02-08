import { Box, Grid, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { GET_POSTS, getPosts } from '@/app/board/api/get-posts.api';
import { CursorPagination } from '@/components/layouts/cursor-pagination.component';

import { PostCard } from './post-card.component';

export const Posts = () => {
  const [cursor, setCursor] = useState({});

  const mutation = useQuery({
    queryKey: [GET_POSTS],
    queryFn: () => getPosts(cursor),
    retry: false,
  });

  useEffect(() => {
    mutation.refetch();
  }, [cursor]);

  if (mutation.isLoading) {
    return <></>;
  }

  return (
    <>
      <Box mb="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
        {mutation.data?.posts?.length > 0 ? (
          <Grid justify="center">
            {mutation.data?.posts.map((post) => {
              return (
                <Grid.Col span={12} key={post.id} sm={6} md={4}>
                  <PostCard post={post} />
                </Grid.Col>
              );
            })}
          </Grid>
        ) : (
          <Text align="center">It looks like nobody has written anything yet. Be the first!</Text>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CursorPagination
          onPreviousPage={() =>
            setCursor({
              before: mutation.data?.meta.startCursor,
            })
          }
          onNextPage={() =>
            setCursor({
              after: mutation.data?.meta.endCursor,
            })
          }
          {...mutation.data.meta}
        />
      </Box>
    </>
  );
};
