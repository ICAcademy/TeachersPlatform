import axios from 'axios';

// Services
import { tokenService } from 'services/tokenServices';

export const API_URL = 'http://localhost:5000';
export const URL = 'http://localhost:3000';

const API = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const onRequestSuccess = async (config) => {
  const tokens = tokenService.getTokens();
  if (tokens?.accessToken) {
    if (config?.headers) {
      config.headers.Authorization = `Bearer ${tokenService.getAccessToken()}`;
    }
  }
  return config;
};

API.interceptors.request.use(onRequestSuccess);

export default API;
