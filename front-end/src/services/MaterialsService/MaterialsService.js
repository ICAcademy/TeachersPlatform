import API, { API_URL } from 'API';

export const getLevels = async () => {
  const response = await API.get(`${API_URL}/api/materials-levels`);
  return response.data;
};

export const getUnitsByLevel = async (level) => {
  const response = await API.get(`${API_URL}/api/materials-levels/get-units-by-level/${level}`);
  return response.data;
};

export const getMaterialsByUnit = async (params) => {
  const { data } = await API.get(`${API_URL}/api/materials`, { params });
  return data;
};
