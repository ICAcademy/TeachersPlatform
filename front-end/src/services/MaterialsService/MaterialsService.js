import API from 'API';

export const getLevels = async () => {
  const response = await API.get('/api/materials-levels');
  return response.data;
};

export const getUnitsByLevel = async (level) => {
  const response = await API.get(`/api/materials-levels/get-units-by-level/${level}`);
  return response.data;
};
