import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, Text } from '@mantine/core';
import { closeModal } from '@mantine/modals';

import { DELETE_POST_KEY, deletePost } from '@/app/board/api/delete-post.api';
import { GET_POSTS } from '@/app/board/api/get-posts.api';
import { SubmitButton } from '@/components/buttons/submit-button.component';
import { queryClient } from '@/config/query';
import { useMutationWithNotification } from '@/hooks/use-mutation-with-notification.hook';

import { DELETE_POST_MODAL_ID } from './delete-post-button.component';

export const DeletePostModal = ({ postId }) => {
  const mutation = useMutationWithNotification({
    mutationKey: DELETE_POST_KEY,
    mutationFn: deletePost,
    onSuccess: async () => {
      closeModal(DELETE_POST_MODAL_ID);

      await queryClient.invalidateQueries({
        queryKey: [GET_POSTS],
      });
    },
  });

  return (
    <Box>
      <Text>Are you sure you want to delete this post?</Text>

      <SubmitButton
        fullWidth
        color="red"
        mt="sm"
        loading={mutation.isLoading}
        onClick={() => mutation.mutate(postId)}
        leftIcon={<TrashIcon width={16} />}
      >
        Delete
      </SubmitButton>
    </Box>
  );
};
