import { PlusIcon } from '@heroicons/react/24/solid';
import { Button, Grid } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { ActivityCard } from '@/app/activity/components/activity-card.component';
import { PageHeader } from '@/components/layouts/page-header.component';

import {
  GET_USER_BOOKED_ACTIVITIES_KEY,
  getUserBookedActivities,
} from './api/get-user-booked-activities.api';

export const ProfilePage = () => {
  const { data: activities } = useQuery({
    queryKey: [GET_USER_BOOKED_ACTIVITIES_KEY],
    queryFn: getUserBookedActivities,
    initialData: [],
    retry: 0,
  });

  return (
    <Grid>
      <Grid.Col>
        <PageHeader
          title="Profile"
          subtitle="Keep track of your booked activities and pets in one convenient place with your profile page. Edit your bookings, manage your pets and keep everything organized with ease."
        />
      </Grid.Col>

      <Grid.Col span={9}>
        {activities.map((activity) => {
          return <ActivityCard key={activity.id} activity={activity} activeButton="unbook" />;
        })}
      </Grid.Col>

      <Grid.Col span={3}>
        <Button leftIcon={<PlusIcon width={16} />} fullWidth>
          Add an animal
        </Button>

        <div>Animals</div>
      </Grid.Col>
    </Grid>
  );
};
