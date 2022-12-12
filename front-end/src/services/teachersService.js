import API, { API_URL } from 'API';

export const getTeachers = async () => {
  const { data } = await await API.get(`${API_URL}/api/teachers/`);
  return data;
};
