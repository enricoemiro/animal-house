import { useId } from '@mantine/hooks';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { ErrorRenderer } from '@/components/error-renderer.component';
import { ErrorNotification } from '@/components/notifications/error-notification.component';
import { LoadingNotification } from '@/components/notifications/loading-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';

/**
 * @param {import('@tanstack/react-query').UseMutationOptions} props - Props
 */
export const useMutationWithNotification = ({
  mutationKey,
  mutationFn,
  onMutate,
  onSuccess,
  onError,
  ...others
}) => {
  const notificationId = useId();

  const mutation = useMutation({
    mutationKey,
    mutationFn,
    onMutate: () => {
      showNotification(
        LoadingNotification({
          id: notificationId,
        }),
      );
    },
    onSuccess: async (data) => {
      updateNotification(
        SuccessNotification({
          id: notificationId,
          message: data,
        }),
      );

      await onSuccess(data);
    },
    onError: (error) => {
      updateNotification(
        ErrorNotification({
          id: notificationId,
          message: <ErrorRenderer error={error} />,
        }),
      );
    },
    ...others,
  });

  return mutation;
};
