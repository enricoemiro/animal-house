import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      enabled: true,
    },
  },
});

export default queryClient;
