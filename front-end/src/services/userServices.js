import API, { API_URL } from 'API';

const userServices = {
  getUser: async () => {
    try {
      const user = await API.get(`${API_URL}/auth/me`);
      return user;
    } catch (e) {
      console.log(e, '1');
    }
  },
};

export default userServices;
