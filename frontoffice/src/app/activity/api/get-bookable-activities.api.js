import axios from '@/config/axios';

export const GET_BOOKABLE_ACTIVITIES_KEY = 'getBookableActivities';

export const getBookableActivities = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/activity/get/bookable/activities',
  });

  return response.data?.activities;
};
