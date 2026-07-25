import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if error is 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Potentially handle logout or refresh token here
      // For now, if the API returns 401, we let the frontend catch it
    }
    return Promise.reject(error);
  }
);

export default api;
