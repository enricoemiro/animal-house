import { Center, Grid, SimpleGrid } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { ActivityList } from '@/app/activity/components/activity-list.component';
import { PageHeader } from '@/components/layouts/page-header.component';

import { GET_USER_ANIMALS, getUserAnimals } from './api/get-user-animals.api';
import {
  GET_USER_BOOKED_ACTIVITIES_KEY,
  getUserBookedActivities,
} from './api/get-user-booked-activities.api';
import { AnimalCard } from './components/animal-card.component';
import { CreateAnimalButton } from './components/create-animal-button.component';

export const ProfilePage = () => {
  const { data: activities } = useQuery({
    queryKey: [GET_USER_BOOKED_ACTIVITIES_KEY],
    queryFn: getUserBookedActivities,
    initialData: [],
    retry: 0,
  });

  const { data: animals } = useQuery({
    queryKey: [GET_USER_ANIMALS],
    queryFn: getUserAnimals,
    initialData: [],
    retry: 0,
  });

  return (
    <SimpleGrid spacing="md">
      <PageHeader
        title="Profile"
        subtitle="Keep track of your booked activities and pets in one convenient place with your profile page. Edit your bookings, manage your pets and keep everything organized with ease."
      />

      <Center>
        <CreateAnimalButton />
      </Center>

      <Grid>
        {activities.length > 0 && (
          <Grid.Col span={9}>
            <ActivityList activities={activities} activeButton="unbook" />
          </Grid.Col>
        )}

        {animals.length > 0 && (
          <Grid.Col span={3}>
            {animals.map((animal) => {
              return <AnimalCard key={animal.id} animal={animal} />;
            })}
          </Grid.Col>
        )}
      </Grid>
    </SimpleGrid>
  );
};
