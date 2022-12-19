import API, { API_URL } from 'API';

export const getLevels = async () => {
  const { data } = await API.get(`${API_URL}/api/questions/levels`);
  return data;
};

export const getUnitsByLevel = async (level) => {
  const { data } = await API.get(`${API_URL}/api/questions/units`, { params: { level } });
  console.log('data', data);
  return data;
};

export const getTopicDataByUrl = async (params) => {
  const { data } = await API.get(`${API_URL}/api/questions/url`, { params });
  return data;
};

export const getQuestionsByUnitName = async (params) => {
  const { data } = await API.get(`${API_URL}/api/questions/`, { params });
  return data;
};
