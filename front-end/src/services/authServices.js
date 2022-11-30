import API, { API_URL } from 'API';
import { tokenServices } from 'services/tokenServices';

export const authService = {
  registration: async (user) => {
    const { data } = API.post(`${API_URL}/auth/register`, user);
    return data;
  },

  login: async (user) => {
    const data = await API.post(`${API_URL}/auth/login`, user);
    tokenServices.updateToken(data.data.token);
    return data;
  },

  logout: async () => {
    await API.post(`${API_URL}/auth/logout`);
    tokenServices.removeToken();
  },
};