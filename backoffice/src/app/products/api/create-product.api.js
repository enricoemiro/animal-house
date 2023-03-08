import { prod } from "@/config/axios";

export const createProduct = async (formData) => {
  const response = await prod.request({
    method: 'POST',
    url: '/product/create',
    data: formData,
  });
  console.log(response);
  return response.data;
};
