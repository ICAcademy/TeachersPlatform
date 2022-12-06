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
