import { List } from '@mantine/core';

/**
 * @param {Object} props - Props
 * @param {import('axios').AxiosError} props.error - Axios error
 */
export const ErrorRenderer = ({ error }) => {
  const { validationErrors, message } = error?.response?.data || {};

  if (validationErrors) {
    return (
      <List>
        {Object.keys(validationErrors).map((key, index) => {
          return <List.Item key={index}>{validationErrors[key]}</List.Item>;
        })}
      </List>
    );
  }

  if (message) {
    return <>{message}</>;
  }

  // If all previous cases fail, the return will be the default error message from Axios
  return <>{error.message}</>;
};
