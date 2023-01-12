import API from 'API';

export const createDictionary = async (dictionary) => {
  const { data } = await API.post('/api/dictionary', dictionary);
  return data;
};

export const getDictionaryById = async (id) => {
  const { data } = await API.get(`/api/dictionary/${id}`);
  return data;
};

export const getDictionaryByStudentId = async (params) => {
  const { data } = await API.get('/api/dictionary', { params });
  return data;
};

export const getDictionaryByQueries = async (params) => {
  const { data } = await API.get('/api/dictionary', { params });
  return data;
};

export const updateDictionaryById = async (id, body) => {
  const { data } = await API.patch(`/api/dictionary/${id}`, { ...body });
  return data;
};

export const deleteDictionary = async (id) => {
  const { data } = await API.delete(`/api/dictionary/${id}`);
  return data;
};
