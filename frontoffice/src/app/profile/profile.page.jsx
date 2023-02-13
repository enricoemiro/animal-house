import { Grid } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { ActivityList } from '@/app/activity/components/activity-list.component';

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
      <Grid.Col span={8}>
        <ActivityList activities={activities} />
      </Grid.Col>

      <Grid.Col span={4}>
        <div>Animals</div>
      </Grid.Col>
    </Grid>
  );
};
