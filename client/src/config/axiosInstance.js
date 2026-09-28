import axios from "axios";

/**
 * Base URL for the API.
 */
const API_BASE_URL = import.meta.env.SERVER_URL + "/api";

// In-memory token store — cleared on page refresh (intentional)
let _accessToken = null;

/**
 * Retrieves the current access token from memory.
 * @returns {string|null} The current access token.
 */
export const getAccessToken = () => _accessToken;

/**
 * Sets the access token in memory.
 * @param {string|null} token - The access token to store.
 */
export const setAccessToken = (token) => {
  _accessToken = token || null;
};

/**
 * Clears the access token from memory.
 */
export const clearAccessToken = () => {
  _accessToken = null;
};

/**
 * Axios instance pre-configured with the base URL and credentials.
 * Automatically handles access token injection and token refresh on 401s.
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

/**
 * Processes the queue of failed requests.
 * @param {Error|null} error - If present, rejects all queued requests.
 * @param {string|null} token - If present, resolves all queued requests with the new token.
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Attach access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401s and automatic token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/register") ||
      originalRequest.url?.includes("/auth/refresh");

    // If 401 and not already retried and not an auth endpoint, attempt refresh
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      if (isRefreshing) {
        // Queue this request until the ongoing refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use standard axios to avoid circular interceptor calls
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken =
          response.data?.data?.accessToken || response.data?.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token returned from refresh endpoint");
        }

        setAccessToken(newAccessToken);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        clearAccessToken();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;