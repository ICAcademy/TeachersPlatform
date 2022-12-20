import API from 'API';

export const userService = {
  getUser: async () => {
    try {
      const user = await API.get('/auth/me');
      return user;
    } catch (e) {
      console.log(e);
    }
  },
};

export const updateUserById = async (id, body) => {
  try {
    const { data } = await API.patch(`/api/users/${id}`, { ...body });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
