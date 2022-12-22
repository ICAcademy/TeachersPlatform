import API from 'API';

export const getLevels = async () => {
  const { data } = await API.get('/api/questions/levels');
  return data;
};

export const getUnitsByLevel = async (level) => {
  const { data } = await API.get('/api/questions/units', { params: { level } });
  return data;
};

export const getTopicDataByUrl = async (url) => {
  const { data } = await API.get('/api/questions/url', { params: { url } });
  return data;
};

export const getQuestionsByUnitName = async (params) => {
  const { data } = await API.get('/api/questions/', { params });
  return data;
};
