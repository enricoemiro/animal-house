import axios from '@/config/axios';

export const ME_KEY = 'me';

export const me = async () => {
  try {
    const { data } = await axios.get('/auth/me');
    return data.user;
  } catch (error) {
    const { status } = error?.response;

    if (status === 401 || status === 403) {
      return null;
    }

    throw error;
  }
};
