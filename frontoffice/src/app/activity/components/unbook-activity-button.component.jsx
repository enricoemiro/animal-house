import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@mantine/core';

import { UNBOOK_ACTIVITY_KEY, unbookActivity } from '@/app/activity/api/unbook-activity.api';
import { GET_USER_BOOKED_ACTIVITIES_KEY } from '@/app/profile/api/get-user-booked-activities.api';
import { queryClient } from '@/config/query';
import { useQueryWithNotification } from '@/hooks/use-query-with-notification.hook';

/**
 * @param {{ activity: Object } & import('@mantine/core').ButtonProps} props - Props
 */
export const UnbookActivityButton = ({ activity, ...others }) => {
  const query = useQueryWithNotification({
    queryKey: [UNBOOK_ACTIVITY_KEY, activity.id],
    queryFn: () => unbookActivity(activity.id),
    enabled: false,
    retry: 0,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_USER_BOOKED_ACTIVITIES_KEY],
      });
    },
  });

  return (
    <Button
      color="red"
      leftIcon={<TrashIcon width={16} />}
      onClick={() => query.refetch()}
      loading={query.isInitialLoading}
      {...others}
    >
      Unbook
    </Button>
  );
};
