import { TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { UNBOOK_ACTIVITY_KEY, unbookActivity } from '@/app/activity/api/unbook-activity.api';

/**
 * @param {{ activity: Object } & import('@mantine/core').ButtonProps} props - Props
 */
export const UnbookActivityButton = ({ activity, ...others }) => {
  const query = useQuery({
    queryKey: [UNBOOK_ACTIVITY_KEY],
    queryFn: () => unbookActivity(activity.id),
    enabled: false,
    retry: 0,
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
