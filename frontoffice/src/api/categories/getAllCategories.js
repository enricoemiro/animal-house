import axios from '@/config/axios';

export const GET_ALL_CATEGORIES_KEY = 'getAllCategories';

export const getAllCategories = async () => {
  const {data} = await axios.get(`/category/get/all/categories`);
  console.log(data.categories);
  return data.categories;
};
