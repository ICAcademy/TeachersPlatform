import API, { API_URL } from 'API';

export const getAllTeacher = async () => {
  const { data } = await API.get('/api/teachers');
  return data;
};

export const getTeacherById = async (id) => {
  const { data } = await API.get(`/api/teachers/${id}`);
  return data;
};

export const getTeacher = async (id) => {
  const { data } = await API.get(`${API_URL}/api/teachers/${id}`);
  return data;
};

export const updateTeacher = async (id, body) => {
  const { data } = await API.put(`${API_URL}/api/teachers/${id}`, { ...body });
  return data;
};
