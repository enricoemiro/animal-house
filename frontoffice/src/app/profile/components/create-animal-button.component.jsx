import { PlusIcon } from '@heroicons/react/24/solid';
import { Button, Title } from '@mantine/core';
import { openModal } from '@mantine/modals';

import { CreateAnimalModal } from './create-animal-modal.component';

export const CREATE_ANIMAL_MODAL_ID = 'createAnimalModal';

export const CreateAnimalButton = () => {
  const handleOpenCreateAnimalModal = () => {
    openModal({
      modalId: CREATE_ANIMAL_MODAL_ID,
      centered: true,
      size: 'sm',
      title: <Title size="h3">Create an animal</Title>,
      children: <CreateAnimalModal />,
    });
  };

  return (
    <Button leftIcon={<PlusIcon width={16} />} onClick={() => handleOpenCreateAnimalModal()}>
      Add an animal
    </Button>
  );
};
