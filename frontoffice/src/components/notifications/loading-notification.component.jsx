/**
 * @param {import('@mantine/notifications').NotificationProps} props - Props
 */
export const LoadingNotification = ({ id, ...others }) => {
  return {
    id,
    loading: true,
    title: 'Processing Request',
    message: 'Your request is being processed, please wait a moment.',
    autoClose: false,
    disallowClose: true,
    ...others,
  };
};
