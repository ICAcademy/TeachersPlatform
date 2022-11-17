import axios from 'axios';

const baseUrl = 'api/v1/questions';

export const getAllQuestions = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};
