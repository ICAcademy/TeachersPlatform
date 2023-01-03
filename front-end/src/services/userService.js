import API from 'API';

export const getUser = async () => {
  const user = await API.get('/auth/me');
  return user;
};

export const updateUserById = async (id, body) => {
  const { data } = await API.patch(`/api/users/${id}`, { ...body });
  console.log('data', data);
  return data;
};

export const changePassword = async (id, body) => {
  return await API.patch(`/api/users/change-password/${id}`, { ...body });
};
