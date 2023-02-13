import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';

import { UNBOOK_ACTIVITY_KEY, unbookActivity } from '@/app/activity/api/unbook-activity.api';
import { GET_USER_BOOKED_ACTIVITIES_KEY } from '@/app/profile/api/get-user-booked-activities.api';
import { ErrorNotification } from '@/components/notifications/error-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';
import { queryClient } from '@/config/query';

/**
 * @param {{ activity: Object } & import('@mantine/core').ButtonProps} props - Props
 */
export const UnbookActivityButton = ({ activity, ...others }) => {
  const query = useQuery({
    queryKey: [UNBOOK_ACTIVITY_KEY],
    queryFn: () => unbookActivity(activity.id),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      showNotification(
        SuccessNotification({
          message: data,
        }),
      );

      queryClient.invalidateQueries({
        queryKey: [GET_USER_BOOKED_ACTIVITIES_KEY],
      });
    },
    onError: (error) => {
      showNotification(
        ErrorNotification({
          message: <ErrorRenderer error={error} />,
        }),
      );
    },
  });

  return (
    <Button
      color="red"
      variant="default"
      leftIcon={<TrashIcon width={16} />}
      onClick={() => query.refetch(activity.id)}
      {...others}
    >
      Unbook
    </Button>
  );
};
