import { BookmarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';
import { useId } from 'react';

import { BOOK_ACTIVITY_KEY, bookActivity } from '@/app/activity/api/book-activity.api';
import { GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY } from '@/app/headoffice/api/get-activities-by-head-office-id.api';
import { ErrorRenderer } from '@/components/error-renderer.component';
import { ErrorNotification } from '@/components/notifications/error-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';
import { queryClient } from '@/config/query';

/**
 * @param {{ activity: Object } & import('@mantine/core').ButtonProps} props - Props
 */
export const BookActivityButton = ({ activity, ...others }) => {
  const notificationId = useId();

  const query = useQuery({
    queryKey: [BOOK_ACTIVITY_KEY, activity.id],
    queryFn: () => bookActivity(activity.id),
    enabled: false,
    retry: 0,
    onSuccess: (data) => {
      showNotification(
        SuccessNotification({
          id: notificationId,
          message: data,
        }),
      );

      queryClient.invalidateQueries({
        queryKey: [GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY, activity.headOfficeId],
      });
    },
    onError: (error) => {
      showNotification(
        ErrorNotification({
          id: notificationId,
          message: <ErrorRenderer error={error} />,
        }),
      );
    },
  });

  return (
    <Button
      variant="default"
      leftIcon={<BookmarkIcon width={16} />}
      onClick={() => query.refetch(activity.id)}
      {...others}
    >
      Book
    </Button>
  );
};
