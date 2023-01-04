import axios from '@/config/axios';

export const BOOKED_ACTIVITIES_KEY = 'bookedActivitiesKey';

export const bookedActivities = async () => {
  const { data } = await axios.get('/user/booked/activities');
  return data.activities;
};
