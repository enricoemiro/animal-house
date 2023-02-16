import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@mantine/core';

import { DELETE_USER_ANIMAL_KEY, deleteUserAnimal } from '@/app/profile/api/delete-user-animal.api';
import { GET_USER_ANIMALS } from '@/app/profile/api/get-user-animals.api';
import { queryClient } from '@/config/query';
import { useMutationWithNotification } from '@/hooks/use-mutation-with-notification.hook';

export const DeleteAnimalButton = ({ animalId }) => {
  const mutation = useMutationWithNotification({
    mutationKey: DELETE_USER_ANIMAL_KEY,
    mutationFn: deleteUserAnimal,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [GET_USER_ANIMALS],
      });
    },
  });

  return (
    <Button
      color="red"
      size="xs"
      onClick={() => mutation.mutate(animalId)}
      aria-label={`Delete animal id: ${animalId}`}
    >
      <TrashIcon width={16} />
    </Button>
  );
};
