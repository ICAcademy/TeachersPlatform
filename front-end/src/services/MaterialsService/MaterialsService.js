import API, { API_URL } from 'API';

export const getLevels = async () => {
  const { data } = await API.get(`${API_URL}/api/materials-levels`);
  return data;
};

export const getUnitsByLevel = async (level) => {
  const { data } = await API.get(`${API_URL}/api/materials-levels/get-units-by-level/${level}`);
  return data;
};

export const createMaterial = async (material) => {
  const { data } = await API.post(`${API_URL}/api/materials`, material);
  return data;
};

export const updateMaterial = async (id, material) => {
  const { data } = await API.patch(`${API_URL}/api/materials/${id}`, material);
  return data;
};

export const deleteMaterial = async (id) => {
  const { data } = await API.delete(`${API_URL}/api/materials/${id}`);
  return data;
};

export const uploadImage = async (img) => {
  const { data } = await API.post(`${API_URL}/api/files/upload-photo`, img, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
