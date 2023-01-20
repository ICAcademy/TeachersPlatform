import API from 'API';
import { updateToken, removeToken } from 'services/tokenService';

export const registration = async (user) => {
  const { data } = await API.post('/auth/register', user);
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

export const requestChangePasswordService = async (email) => {
  const { data } = await API.post('/auth/request-reset-password', { email });
  return data;
};

export const resetPasswordService = async (token, userId, password) => {
  const { data } = await API.post('/auth/request-reset-password', { token, userId, password });
  return data;
};
