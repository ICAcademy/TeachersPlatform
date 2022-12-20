import API from 'API';

export const userService = {
  getUser: async () => {
    const user = await API.get('/auth/me');
    return user;
  },
};

export const updateUserById = async (id, body) => {
  const { data } = await API.patch(`/api/users/${id}`, { ...body });
  return data;
};
