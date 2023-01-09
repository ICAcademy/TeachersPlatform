import API, { API_URL } from 'API';

export const getTeacher = async (id) => {
  const { data } = await API.get(`${API_URL}/api/teachers/${id}`);
  return data;
};

export const updateTeacher = async (id, body) => {
  const { data } = await API.patch(`${API_URL}/api/teachers/${id}`, { ...body });
  return data;
};

export const getAllTeacher = async () => {
  const { data } = await API.get('/api/teachers');
  return data;
};

export const getTeacherById = async (id) => {
  const { data } = await API.get(`/api/teachers/${id}`);
  return data;
};
