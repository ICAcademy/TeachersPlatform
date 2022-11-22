import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/questions';

export const getQuestionsData = async (params = {}) => {
  const { data } = await axios.get(baseUrl, { params });
  return data;
};

export const getLevels = async () => {
  const { data } = await axios.get(`${baseUrl}/levels`);
  return data;
};

export const getUnitsByLevel = async (params) => {
  const { data } = await axios.get(`${baseUrl}/units`, { params });
  return data;
};

export const getTopicsByUnit = async (params) => {
  const { data } = await axios.get(`${baseUrl}/topics`, { params });
  return data;
};

export const getQuizByTopic = async (params) => {
  const { data } = await axios.get(`${baseUrl}/quiz`, { params });
  return data;
};
