import { Button } from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';

import { ME_KEY } from '@/app/auth/api/me.api';
import { useAuth } from '@/app/auth/use-auth.hook';
import { LoadingNotification } from '@/components/notifications/loading-notification.component';
import { SuccessNotification } from '@/components/notifications/success-notification.component';
import { queryClient } from '@/config/query';

import { UPDATE_VIP_KEY, updateVip } from '../api/update-vip.api';

export const UpdateVipButton = () => {
  const UPDATE_VIP_NOTIFICATION_ID = 'updateVipNotificationId';
  const {
    meQuery: { data: user },
  } = useAuth();

  const mutation = useMutation({
    mutationFn: async (value) => {
      console.log(value);
      return await updateVip(value);
    },
    mutationKey: [UPDATE_VIP_KEY],

    onMutate: () => {
      showNotification(
        LoadingNotification({
          id: UPDATE_VIP_NOTIFICATION_ID,
        }),
      );
    },

    onSuccess: async (data) => {
      updateNotification(
        SuccessNotification({
          id: UPDATE_VIP_NOTIFICATION_ID,
          message: data,
        }),
      );
      await queryClient.invalidateQueries({
        queryKey: [ME_KEY],
      });
    },
  });

  return (
    <Button aria-label="Click to update VIP status" onClick={() => mutation.mutate(!user?.vip)}>
      {user?.vip ? 'Turn off VIP' : 'Turn on VIP'}
    </Button>
  );
};
