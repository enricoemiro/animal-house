import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, SimpleGrid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal } from '@mantine/modals';
import { useState } from 'react';

import { CREATE_POST_KEY, createPost } from '@/app/board/api/create-post.api';
import { GET_POSTS } from '@/app/board/api/get-posts.api';
import { SubmitButton } from '@/components/buttons/submit-button.component';
import { ContentInput } from '@/components/form/content-input.component';
import { DropzoneInput } from '@/components/form/dropzone-input.component';
import { PostCategoryInput } from '@/components/form/post-category-input.component';
import { queryClient } from '@/config/query';
import { useMutationWithNotification } from '@/hooks/use-mutation-with-notification.hook';
import { PostSchema } from '@/schemas/post.schema';

import { CREATE_POST_MODAL_ID } from './create-post-button.component';

export const CreatePostModal = () => {
  const [files, setFiles] = useState([]);

  const mutation = useMutationWithNotification({
    mutationKey: CREATE_POST_KEY,
    mutationFn: createPost,
    onSuccess: async () => {
      closeModal(CREATE_POST_MODAL_ID);

      await queryClient.invalidateQueries({
        queryKey: [GET_POSTS],
      });
    },
  });

  const form = useForm({
    validate: zodResolver(PostSchema),
    initialValues: {
      content: '',
      category: null,
    },
  });

  const onSubmit = (values) => {
    mutation.mutate({
      content: values.content,
      category: values.category,
      images: files,
    });
  };

  return (
    <Box component="form" encType="multipart/form-data" onSubmit={form.onSubmit(onSubmit)}>
      <SimpleGrid spacing={5}>
        <DropzoneInput handleOnDrop={(files) => setFiles(files)} />
        <ContentInput {...form.getInputProps('content')} />
        <PostCategoryInput {...form.getInputProps('category')} />
      </SimpleGrid>

      <SubmitButton
        fullWidth
        mt="sm"
        loading={mutation.isLoading}
        leftIcon={<PlusIcon width={16} />}
      >
        Create Post
      </SubmitButton>
    </Box>
  );
};
