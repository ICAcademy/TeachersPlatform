import API from 'API';

export const getLevels = async () => {
  const { data } = await API.get('/api/questions/levels');
  return data;
};

export const getQuestionsUnitsByLevel = async (level) => {
  const { data } = await API.get('/api/questions/units', { params: { level } });
  return data;
};

export const getTopicDataByUrl = async (params) => {
  const { data } = await API.get('/api/questions/url', params);
  return data;
};

export const getQuestionsByUnitName = async (params) => {
  const { data } = await API.get('/api/questions/', { params });
  return data;
};

export const getTestById = async (id) => {
  const response = await API.get(`/api/questions/${id}`);
  return response.data;
};

export const createTest = async (question) => {
  const { data } = await API.post('/api/questions', question);
  return data;
};

export const updateTest = async (id, question) => {
  const { data } = await API.patch(`api/questions/${id}`, question);
  return data;
};
