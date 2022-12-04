import API, { API_URL } from 'API';
import { tokenService } from 'services/tokenService';

export const authService = {
  registration: async (user) => {
    const { data } = API.post(`${API_URL}/auth/register`, user);
    return data;
  },

  login: async (user) => {
    const data = await API.post(`${API_URL}/auth/login`, user);
    tokenService.updateToken(data.data.token);
    return data;
  },

  logout: async () => {
    tokenService.removeToken();
  },
};
