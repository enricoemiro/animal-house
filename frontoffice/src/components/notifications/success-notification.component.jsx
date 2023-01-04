import { CheckIcon } from '@heroicons/react/24/solid';

/**
 * @param {import('@mantine/notifications').NotificationProps} props - Props
 */
export const SuccessNotification = ({ id, message, ...others }) => {
  return {
    id,
    color: 'teal',
    title: 'We notify you that',
    message,
    icon: <CheckIcon width={16} />,
    autoClose: true,
    ...others,
  };
};
