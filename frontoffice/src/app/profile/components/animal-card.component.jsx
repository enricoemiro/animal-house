import { Flex, Paper, Text } from '@mantine/core';

import { DeleteAnimalButton } from './delete-animal-button.component';

export const AnimalCard = ({ animal }) => {
  return (
    <Paper shadow="xs" p="md">
      <Flex align="center" justify="space-between">
        <Text>{animal.name}</Text>

        <DeleteAnimalButton animalId={animal.id} />
      </Flex>
    </Paper>
  );
};
