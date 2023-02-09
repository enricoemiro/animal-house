import axios from '@/config/axios';

export const GET_ACTIVITIES_BY_HEADOFFICE_ID_KEY = 'getActivitiesByHeadOfficeId';

export const getActivitiesByHeadOfficeId = async (id) => {
  const response = await axios.request({
    method: 'GET',
    url: `/headoffice/${id}/activities`,
  });

  return response.data?.activities;
};
