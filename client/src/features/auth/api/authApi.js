import axiosInstance from "../../../config/axiosInstance";

/**
 * Auth API Service
 */
export const loginApi = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await axiosInstance.post("/auth/register", userData);
  return response.data;
};

export const logoutApi = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getMeApi = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const refreshTokenApi = async () => {
  const response = await axiosInstance.post("/auth/refresh");
  return response.data;
};
