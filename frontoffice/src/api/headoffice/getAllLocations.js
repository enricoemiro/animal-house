import axios from '@/config/axios';

export const GET_ALL_LOCATIONS_KEY = 'getAllLocations';

export const getAllLocations = async () => {
  const { data } = await axios.get('/headoffice/get/all/locations');
  return data.headoffices;
};
