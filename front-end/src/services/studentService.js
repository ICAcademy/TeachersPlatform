import API from 'API';

export const getAllStudents = async () => {
  const { data } = await API.get('/api/students');
  return data;
};

export const updateStudentData = async (id, body) => {
  const { data } = await API.patch(`api/students/${id}`, body);
  return data;
};
