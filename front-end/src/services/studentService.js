import API from 'API';

export const updateStudentData = async (id, body) => {
  const { data } = await API.patch(`api/students/${id}`, body);
  return data;
};
