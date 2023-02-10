import { Badge, Card, Group, Text, Title } from '@mantine/core';
import { format } from 'date-fns';

import { BookActivityButton } from './book-activity-button.component';

export const ActivityCard = ({ activity }) => {
  return (
    <Card shadow="xs" p="lg" radius="md">
      <Group position="apart">
        <Title order={3}>{activity.name}</Title>
        <BookActivityButton activity={activity} />
      </Group>

      <Text size="sm" color="dimmed" my="xs">
        {activity.description}
      </Text>

      <Group spacing={5}>
        {activity?.headOffice?.location && <Badge>Location: {activity.headOffice.location}</Badge>}

        <Badge>Mode: {activity.mode}</Badge>
        <Badge>{format(new Date(activity.dateOfPerformance), 'PPPPppp')}</Badge>
        <Badge>{activity.availability} places available</Badge>
      </Group>
    </Card>
  );
};
