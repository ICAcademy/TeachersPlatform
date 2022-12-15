import axios from 'axios';

// Services
import { tokenService } from 'services/tokenService';

let modeUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  modeUrl = 'http://localhost:5000';
} else {
  modeUrl = 'https://teacher-platform.onrender.com';
}

export const API_URL = modeUrl;
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
