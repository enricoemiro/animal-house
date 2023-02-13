import { BookmarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@mantine/core';
import { useLocation } from 'react-router-dom';

import { BOOK_ACTIVITY_KEY, bookActivity } from '@/app/activity/api/book-activity.api';
import { GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY } from '@/app/headoffice/api/get-activities-by-head-office-id.api';
import { queryClient } from '@/config/query';
import { useQueryWithNotification } from '@/hooks/use-query-with-notification.hook';

import { GET_BOOKABLE_ACTIVITIES_KEY } from '../api/get-bookable-activities.api';

/**
 * @param {{ activity: Object } & import('@mantine/core').ButtonProps} props - Props
 */
export const BookActivityButton = ({ activity, ...others }) => {
  const { pathname } = useLocation();

  const query = useQueryWithNotification({
    queryKey: [BOOK_ACTIVITY_KEY, activity.id],
    queryFn: () => bookActivity(activity.id),
    enabled: false,
    retry: 0,
    onSuccess: () => {
      if (pathname === '/headoffices') {
        queryClient.invalidateQueries({
          queryKey: [GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY, activity.headOfficeId],
        });
      }

      if (pathname === '/activities') {
        queryClient.invalidateQueries({
          queryKey: [GET_BOOKABLE_ACTIVITIES_KEY],
        });
      }
    },
  });

  return (
    <Button
      variant="default"
      leftIcon={<BookmarkIcon width={16} />}
      onClick={() => query.refetch()}
      {...others}
    >
      Book
    </Button>
  );
};
