import axios from 'axios';

// Services
import { tokenService } from 'services/tokenService';

export const API_URL = 'http://localhost:5000';
export const URL = 'http://localhost:3000';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const addAuthHeaders = async (config) => {
  const token = tokenService.getToken();
  if (token) {
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

API.interceptors.request.use(addAuthHeaders);

export default API;
