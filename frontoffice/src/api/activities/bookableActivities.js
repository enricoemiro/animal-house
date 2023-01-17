import axios from '@/config/axios';

export const BOOKABLE_ACTIVITIES_KEY = 'availableActivitiesKey';

export const getBookableActivities = async () => {
  const { data } = await axios.get('/activity/get/bookable/activities');
  return data;
};