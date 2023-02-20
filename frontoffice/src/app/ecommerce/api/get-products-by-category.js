import axios from '@/config/axios';

export const GET_PRODUCTS_BY_CATEGORY_KEY = 'getProductsByCategoryId';

export const getProductsByCategory = async (categoryId) => {
  const { data } = await axios.get(`/product/get/products/${categoryId}`);
  return data;
};
