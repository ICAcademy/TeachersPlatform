import API from 'API';
import { updateToken, removeToken } from 'services/tokenService';

export const registration = async (user) => {
  const { data } = API.post('/auth/register', user);
  return data;
};

export const login = async (user) => {
  const data = await API.post('/auth/login', user);
  updateToken(data.data.token);
  return data;
};

export const logout = async () => {
  removeToken();
};
