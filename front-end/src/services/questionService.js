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

export const createQuestion = async (question) => {
  const { data } = await API.post('/api/questions', question);
  return data;
};

export const updateQuestion = async (id, question) => {
  const { data } = await API.patch(`api/questions/${id}`, question);
  return data;
};

export const deleteQuestion = async (id) => {
  const { data } = await API.delete(`/api/questions/${id}`);
  return data;
};
