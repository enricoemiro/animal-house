import axios from '@/config/axios';

export const GET_PRODUCT_BY_ID_KEY = 'getProductById';

export const getProductById = async (id) => {
  const { data } = await axios.get(`/product/get/product/${id}`);
  return data;
};
