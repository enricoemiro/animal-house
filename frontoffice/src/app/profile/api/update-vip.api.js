import axios from '@/config/axios';

export const UPDATE_VIP_KEY = 'updateVip';

export const updateVip = async (value) => {
  const response = await axios.request({
    method: 'POST',
    url: '/user/update/vip',
    data: {
      vip: value,
    },
  });

  return response.data?.message;
};
