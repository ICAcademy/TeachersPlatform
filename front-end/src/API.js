import axios from 'axios';

// Services
import { tokenService } from 'services/tokenService';

// Base url
export const API_URL = 'http://localhost:5000';

// Instance of axios
const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  async (config) => {
    const token = tokenService.getToken();
    if (token) {
      if (config?.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error.response || error.message);
  },
);

API.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const status = error?.response?.status || 0;
    const resBaseURL = error?.response?.config?.baseURL;
    if (resBaseURL === API_URL && status === 401) {
      if (localStorage.getItem('token')) {
        localStorage.clear();
        window.location.assign('/login');
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default API;
