import API from 'API';

export const getTestByUrl = async (url) => {
  const response = await API.get(`/api/questions/get-test-by-url/${url}`);
  return response.data;
};
