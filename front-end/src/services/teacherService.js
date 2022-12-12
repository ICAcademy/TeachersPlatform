import API, { API_URL } from 'API';

export const teacherService = {
  getAllTeacher: async () => {
    try {
      const { data } = await API.get(`${API_URL}/api/teachers`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  getTeacherById: async (id) => {
    try {
      const { data } = await API.get(`${API_URL}/api/teachers/${id}`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};
