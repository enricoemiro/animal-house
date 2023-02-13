import { PlusIcon } from '@heroicons/react/24/solid';
import { Box, SimpleGrid, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { closeModal } from '@mantine/modals';

import { CREATE_USER_ANIMAL_KEY, createUserAnimal } from '@/app/profile/api/create-user-animal.api';
import { SubmitButton } from '@/components/buttons/submit-button.component';
import { queryClient } from '@/config/query';
import { useMutationWithNotification } from '@/hooks/use-mutation-with-notification.hook';
import { AnimalSchema } from '@/schemas/animal.schema';

import { GET_USER_ANIMALS } from '../api/get-user-animals.api';
import { CREATE_ANIMAL_MODAL_ID } from './create-animal-button.component';

export const CreateAnimalModal = () => {
  const mutation = useMutationWithNotification({
    mutationKey: CREATE_USER_ANIMAL_KEY,
    mutationFn: createUserAnimal,
    onSuccess: async () => {
      closeModal(CREATE_ANIMAL_MODAL_ID);

      await queryClient.invalidateQueries({
        queryKey: [GET_USER_ANIMALS],
      });
    },
  });

  const form = useForm({
    validate: zodResolver(AnimalSchema),
    initialValues: {
      name: '',
    },
  });

  const onSubmit = (values) => mutation.mutate(values);

  return (
    <Box component="form" onSubmit={form.onSubmit(onSubmit)}>
      <SimpleGrid spacing={5}>
        <TextInput withAsterisk placeholder="Name" label="Name" {...form.getInputProps('name')} />
      </SimpleGrid>

      <SubmitButton
        fullWidth
        mt="sm"
        loading={mutation.isLoading}
        leftIcon={<PlusIcon width={16} />}
      >
        Create Animal
      </SubmitButton>
    </Box>
  );
};
