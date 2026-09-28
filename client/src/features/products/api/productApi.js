import axiosInstance from "../../../config/axiosInstance";

/**
 * Product API Service
 */
export const getProductsApi = async () => {
  const response = await axiosInstance.get("/product/");
  return response.data;
};

export const getProductByIdApi = async (id) => {
  const response = await axiosInstance.get(`/product/${id}`);
  return response.data;
};

export const createProductApi = async (formData) => {
  const response = await axiosInstance.post("/product/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProductApi = async (id, data) => {
  const response = await axiosInstance.put(`/product/${id}`, data);
  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await axiosInstance.delete(`/product/${id}`);
  return response.data;
};
