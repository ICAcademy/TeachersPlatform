import API from 'API';

export const teacherService = {
  getAllTeacher: async () => {
    const { data } = await API.get('/api/teachers');
    return data;
  },
  getTeacherById: async (id) => {
    const { data } = await API.get(`/api/teachers/${id}`);
    return data;
  },
};
