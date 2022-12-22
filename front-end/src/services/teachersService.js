import API from 'API';

export const getTeachers = async () => {
  const { data } = await API.get('/api/teachers/');
  return data;
};
