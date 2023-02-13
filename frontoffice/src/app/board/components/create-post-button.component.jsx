import { PlusIcon } from '@heroicons/react/24/outline';
import { Button, Title } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/app/auth/use-auth.hook';

import { CreatePostModal } from './create-post-modal.component';

export const CREATE_POST_MODAL_ID = 'createPostModal';

export const CreatePostButton = () => {
  const navigate = useNavigate();
  const {
    meQuery: { data: user },
  } = useAuth();

  const handleOpenCreatePostModal = () => {
    if (!user) {
      return navigate('/auth/login?returnTo=/board');
    }

    openModal({
      modalId: CREATE_POST_MODAL_ID,
      centered: true,
      size: 'lg',
      title: <Title size="h3">Create a post</Title>,
      children: <CreatePostModal />,
    });
  };

  return (
    <Button leftIcon={<PlusIcon width={16} />} onClick={() => handleOpenCreatePostModal()}>
      Create post
    </Button>
  );
};
