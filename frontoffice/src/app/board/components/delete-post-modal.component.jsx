import { TrashIcon } from '@heroicons/react/24/outline';
import { Box, Text } from '@mantine/core';
import { closeModal } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useId } from 'react';

import { DELETE_POST_KEY, deletePost } from '@/app/board/api/delete-post.api';
import { GET_POSTS } from '@/app/board/api/get-posts.api';
import { SubmitButton } from '@/components/buttons/submit-button.component';
import { ErrorNotification } from '@/components/notifications/error-notification.component';
import { LoadingNotification } from '@/components/notifications/loading-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';
import { queryClient } from '@/config/query';

import { DELETE_POST_MODAL_ID } from './delete-post-button.component';

export const DeletePostModal = ({ postId }) => {
  const DELETE_POST_NOTIFICATION_ID = useId();

  const mutation = useMutation({
    mutationKey: DELETE_POST_KEY,
    mutationFn: deletePost,
    onMutate: () => {
      showNotification(
        LoadingNotification({
          id: DELETE_POST_NOTIFICATION_ID,
        }),
      );
    },
    onSuccess: async (data) => {
      updateNotification(
        SuccessNotification({
          id: DELETE_POST_NOTIFICATION_ID,
          message: data,
        }),
      );

      closeModal(DELETE_POST_MODAL_ID);

      await queryClient.invalidateQueries([GET_POSTS]);
    },
    onError: (error) => {
      updateNotification(
        ErrorNotification({
          id: DELETE_POST_NOTIFICATION_ID,
          message: <ErrorRenderer error={error} />,
        }),
      );
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
