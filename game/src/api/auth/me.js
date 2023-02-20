import axios from '@app/config/axios';

export const me = async () => {
  try {
    const { data } = await axios.get('/auth/me', {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      withCredentials: true,
    });
    return data.user;
  } catch (error) {
    const { status } = error?.response;

    if (status === 401 || status === 403) {
      return null;
    }

    throw error;
  }
};
