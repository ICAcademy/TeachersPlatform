import API, { API_URL } from 'API';

export const getMaterialByUrl = async (url) => {
  const response = await API.get(`${API_URL}/api/materials/get-material-by-url/${url}`);
  return response.data;
};

//export const getLessonBody = async (lesson) => {};
