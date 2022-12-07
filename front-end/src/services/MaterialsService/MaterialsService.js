import API, { API_URL } from 'API';

export const getLevels = async () => {
  const response = await API.get(`${API_URL}/api/materials-levels`);
  return response.data;
};

export const getUnitsByLevel = async (level) => {
  const response = await API.get(`${API_URL}/api/materials-levels/get-units-by-level/${level}`);
  return response.data;
};

export const createMaterial = async (material) => {
  const { data } = await axios.post(`${baseUrl}/materials`, material);
  return data;
};

export const updateMaterial = async (id, material) => {
  const { data } = await axios.patch(`${baseUrl}/materials/${id}`, material);
  return data;
};

export const deleteMaterial = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/materials/${id}`);
  return data;
};
