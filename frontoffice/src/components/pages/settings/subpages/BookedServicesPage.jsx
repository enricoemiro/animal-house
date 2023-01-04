import { useQuery } from '@tanstack/react-query';

import { BOOKED_ACTIVITIES_KEY, bookedActivities } from '@/api/activities/bookedActivities';
import { ActivitiesList } from '@/components/shared/ActivitiesList';

function BookedServicesPage() {
  const { isLoading, data: activities } = useQuery([BOOKED_ACTIVITIES_KEY], bookedActivities);

  if (isLoading) {
    return;
  }

  return (
    <>
      <div>
        <h2 className="text-lg leading-6 font-medium text-gray-900">Booked Services</h2>
        <p className="mt-1 text-sm text-gray-500">
          This page displays all your booked services, allowing you to easily manage reservations,
          view details and make changes as needed.
        </p>
      </div>

      <div className="mt-6 flex lg:flex-row">
        {activities && <ActivitiesList activities={activities} />}
      </div>
    </>
  );
}

export { BookedServicesPage };
