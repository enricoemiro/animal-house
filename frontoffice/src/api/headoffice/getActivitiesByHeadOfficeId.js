import axios from '@/config/axios';

export const GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY = 'getActivitiesByHeadOfficeId';

export const getActivitiesByHeadOfficeId = async (id) => {
  const { data } = await axios.get(`/headoffice/${id}/activities`);
  return data.activities;
};
