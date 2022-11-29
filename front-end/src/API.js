import axios from 'axios';

// Services
import { tokenServices } from 'services/tokenServices';

export const API_URL = 'http://localhost:5000';
export const URL = 'http://localhost:3000';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const onRequestSuccess = async (config) => {
  const token = tokenServices.getToken();
  if (token) {
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

API.interceptors.request.use(onRequestSuccess);

export default API;
