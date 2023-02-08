import { XMarkIcon } from '@heroicons/react/24/solid';

/**
 * @param {import('@mantine/notifications').NotificationProps} props - Props
 */
export const ErrorNotification = ({ id, message, ...others }) => {
  return {
    id,
    color: 'red',
    title: 'Operation failed',
    message,
    icon: <XMarkIcon width={16} />,
    autoClose: true,
    ...others,
  };
};
