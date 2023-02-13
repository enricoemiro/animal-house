import { Flex, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { ActivityList } from '@/app/activity/components/activity-list.component';
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

  return (
    <Flex direction="column" gap="xs" mt="xs">
      <Title order={2}>All activities ({headOffice.location})</Title>
      <ActivityList activities={activities} />
    </Flex>
  );
};
