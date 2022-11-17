import axios from 'axios';

const baseUrl = 'api/v1/questions';

export const getAllQuestions = async (params) => {
  const { data } = await axios.get(`${baseUrl}?${params}`);
  return data;
};
