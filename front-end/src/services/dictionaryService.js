import API from 'API';

export const createDictionary = async (dictionary) => {
  const { data } = await API.post('/api/dictionaries', dictionary);
  return data;
};

export const getDictionaryByStudentId = async (params) => {
  const { data } = await API.get('/api/dictionaries', { params });
  return data;
};

export const getDictionary = async (id) => {
  const { data } = await API.get(`/api/dictionaries/${id}`);
  return data;
};

export const updateDictionary = async (id, body) => {
  const { data } = await API.patch(`/api/dictionaries/${id}`, body);
  return data;
};

export const deleteDictionary = async (id) => {
  const { data } = await API.delete(`/api/dictionaries/${id}`);
  return data;
};
