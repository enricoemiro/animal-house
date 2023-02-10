import axios from '@/config/axios';

export const GET_ALL_LOCATIONS_KEY = 'getAllLocations';

export const getAllLocations = async () => {
  const response = await axios.request({
    method: 'GET',
    url: '/headoffice/get/all/locations',
  });

  return response.data?.headoffices;
};
