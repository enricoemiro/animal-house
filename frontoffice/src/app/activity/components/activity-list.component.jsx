import { ActivityCard } from './activity-card.component';

export const ActivityList = ({ activities }) => {
  return activities.map((activity) => {
    return <ActivityCard activity={activity} />;
  });
};
