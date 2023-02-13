import { PlusIcon } from '@heroicons/react/24/outline';
import { Box, SimpleGrid } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import { useId, useState } from 'react';

import { CREATE_POST_KEY, createPost } from '@/app/board/api/create-post.api';
import { GET_POSTS } from '@/app/board/api/get-posts.api';
import { SubmitButton } from '@/components/buttons/submit-button.component';
import { ErrorRenderer } from '@/components/error-renderer.component';
import { ContentInput } from '@/components/form/content-input.component';
import { DropzoneInput } from '@/components/form/dropzone-input.component';
import { PostCategoryInput } from '@/components/form/post-category-input.component';
import { ErrorNotification } from '@/components/notifications/error-notification.component';
import { LoadingNotification } from '@/components/notifications/loading-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';
import { queryClient } from '@/config/query';
import { PostSchema } from '@/schemas/post.schema';

export const CreatePostModal = () => {
  const CREATE_POST_NOTIFICATION_ID = useId();
  const [files, setFiles] = useState([]);

  const mutation = useMutation({
    mutationKey: CREATE_POST_KEY,
    mutationFn: createPost,
    onMutate: () => {
      showNotification(
        LoadingNotification({
          id: CREATE_POST_NOTIFICATION_ID,
        }),
      );
    },
    onSuccess: async (data) => {
      updateNotification(
        SuccessNotification({
          id: CREATE_POST_NOTIFICATION_ID,
          message: data,
        }),
      );

      await queryClient.invalidateQueries([GET_POSTS]);
    },
    onError: (error) => {
      updateNotification(
        ErrorNotification({
          id: CREATE_POST_NOTIFICATION_ID,
          message: <ErrorRenderer error={error} />,
        }),
      );
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
