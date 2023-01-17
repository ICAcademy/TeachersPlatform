import API from 'API';

export const getLevels = async () => {
  const response = await API.get('/api/materials-levels');
  return response.data;
};

export const getMaterialsUnitsByLevel = async (level) => {
  const response = await API.get(`/api/materials-levels/get-units-by-level/${level}`);
  return response.data;
};

export const createMaterial = async (material) => {
  const { data } = await API.post('/api/materials', material);
  return data;
};

export const updateMaterial = async (id, material) => {
  const { data } = await API.patch(`api/materials/${id}`, material);
  return data;
};

export const deleteMaterial = async (id) => {
  const { data } = await API.delete(`/api/materials/${id}`);
  return data;
};

export const uploadImage = async (img) => {
  const { data } = await API.post('/api/files/upload-photo', img, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};

export const getMaterialsByUnit = async (params) => {
  const { data } = await API.get('/api/materials', { params });
  return data;
};
