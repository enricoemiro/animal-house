import { Flex, SimpleGrid, Text, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ActivityCard } from '@/app/activity/components/activity-card.component';
import {
  GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY,
  getActivitiesByHeadOfficeId,
} from '@/app/headoffice/api/get-activities-by-head-office-id.api';

export const HeadOfficeActivities = ({ headOffice }) => {
  const { data: activities } = useQuery({
    queryKey: [GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY, headOffice.id],
    queryFn: () => getActivitiesByHeadOfficeId(headOffice.id),
    initialData: [],
    retry: 0,
  });

  const renderActivities = useMemo(() => {
    if (activities.length === 0) {
      return (
        <Text color="dimmed">
          No activities appear to be available at this location at the moment, please try again
          later.
        </Text>
      );
    }

    return (
      <SimpleGrid>
        {activities?.map((activity) => {
          return <ActivityCard key={activity.id} activity={activity} />;
        })}
      </SimpleGrid>
    );
  }, [activities]);

  return (
    <Flex direction="column" gap="xs" mt="xs">
      <Title order={2}>All activities ({headOffice.location})</Title>
      {renderActivities}
    </Flex>
  );
};
