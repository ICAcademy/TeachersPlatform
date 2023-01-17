import API from 'API';

export const getTestById = async (id) => {
  const response = await API.get(`/api/questions/${id}`);
  return response.data;
};
