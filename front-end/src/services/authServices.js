import API, { API_URL } from 'API';
import { tokenService } from 'services/tokenServices';

export const userService = {
  registration: async (userData) => {
    const { data } = API.post(`${API_URL}/auth/register`, userData);
    tokenService.updateTokens(data);
    return data;
  },

  login: async (userData) => {
    const { data } = await API.post(`${API_URL}/auth/login`, userData);
    tokenService.updateTokens(data);
    return data;
  },

  logout: async () => {
    await API.post('/auth/logout');
    localStorage.removeItem('token');
  },
};

// export const fetchUserByToken = (data) => axios.post('http://localhost:5000/api/me', data);
