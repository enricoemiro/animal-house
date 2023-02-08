import { TrashIcon } from '@heroicons/react/24/outline';
import { Button, Title } from '@mantine/core';
import { openModal } from '@mantine/modals';

import { DeletePostModal } from './delete-post-modal.component';

export const DELETE_POST_MODAL_ID = 'deletePostModal';

export const DeletePostButton = ({ postId }) => {
  const handleOpenDeletePostModal = () => {
    openModal({
      modalId: DELETE_POST_MODAL_ID,
      centered: true,
      size: 'md',
      title: <Title size="h3">Delete post</Title>,
      children: <DeletePostModal postId={postId} />,
    });
  };

  return (
    <Button
      color="red"
      size="xs"
      onClick={() => handleOpenDeletePostModal()}
      aria-label={`Delete post id: ${postId}`}
    >
      <TrashIcon width={16} />
    </Button>
  );
};
