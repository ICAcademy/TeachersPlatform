import API, { API_URL } from 'API';

export const teacherService = {
  getAllTeacher: async () => {
    const { data } = await API.get(`${API_URL}/api/teachers`);
    return data;
  },
  getTeacherById: async (id) => {
    const { data } = await API.get(`${API_URL}/api/teachers/${id}`);
    return data;
  },
};
