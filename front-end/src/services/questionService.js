import API, { API_URL } from 'API';

export const getLevels = async (params) => {
  const { data } = await API.get(`${API_URL}/api/questions/levels`, params);
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

export const getQuestionsByLevelAndUnit = async (searchUnit) => {
  const { data } = await API.get(`${API_URL}/api/questions/`, {
    params: { searchUnit },
  });
  if (searchUnit === '') {
    const allUnits = data.map((item) => {
      return item.unit;
    });
    return allUnits;
  }
  return data;
};
