import axios from '@/config/axios';

export const GET_USER_BOOKED_ACTIVITIES_KEY = 'getUserBookedActivities';

export const getUserBookedActivities = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/user/booked/activities',
  });

  return response.data?.activities;
};
