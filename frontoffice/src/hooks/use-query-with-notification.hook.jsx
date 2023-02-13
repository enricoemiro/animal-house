import { useId } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { useQuery } from '@tanstack/react-query';

import { ErrorRenderer } from '@/components/error-renderer.component';
import { ErrorNotification } from '@/components/notifications/error-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';

/**
 * @param {import('@tanstack/react-query').UseQueryOptions} props - Props
 */
export const useQueryWithNotification = ({ queryKey, queryFn, onSuccess, onError, ...others }) => {
  const notificationId = useId();

  const query = useQuery({
    queryKey,
    queryFn,
    onSuccess: (data) => {
      showNotification(
        SuccessNotification({
          id: notificationId,
          message: data,
        }),
      );

      onSuccess(data);
    },
    onError: (error) => {
      showNotification(
        ErrorNotification({
          id: notificationId,
          message: <ErrorRenderer error={error} />,
        }),
      );

      if (onError) {
        onError(error);
      }
    },
    ...others,
  });

  return query;
};
