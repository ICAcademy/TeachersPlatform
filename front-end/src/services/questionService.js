import API, { API_URL } from 'API';

export const getLevels = async () => {
  const { data } = await API.get(`${API_URL}/api/questions/levels`);
  return data;
};

export const getUnitsByLevel = async (level) => {
  const { data } = await API.get(`${API_URL}/api/questions//units`, { params: { level } });
  return data;
};

export const getTopicDataByUrl = async (url) => {
  const { data } = await API.get(`${API_URL}/api/questions/url`, { params: { url } });
  return data;
};
