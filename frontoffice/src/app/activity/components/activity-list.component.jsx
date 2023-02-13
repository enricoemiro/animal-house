import { SimpleGrid, Text } from '@mantine/core';

import { ActivityCard } from './activity-card.component';

export const ActivityList = ({ activities, ...others }) => {
  if (activities.length === 0) {
    return (
      <Text>
        No activities appear to be available at this location at the moment, please try again later.
      </Text>
    );
  }

  return (
    <SimpleGrid>
      {activities.map((activity) => {
        return <ActivityCard key={activity.id} activity={activity} {...others} />;
      })}
    </SimpleGrid>
  );
};
