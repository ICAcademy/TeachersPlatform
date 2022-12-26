import API from 'API';

export const getAllTeacher = async () => {
  const { data } = await API.get('/api/teachers');
  return data;
};

export const getTeacherById = async (id) => {
  const { data } = await API.get(`/api/teachers/${id}`);
  return data;
};
