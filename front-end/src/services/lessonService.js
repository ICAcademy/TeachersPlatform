import API, { API_URL } from 'API';

export const getAllLessons = async (id) => {
  const { data } = await API.get(`${API_URL}/api/lessons`, { params: { id } });
  return data;
};

export const getSingleLessonById = async (id) => {
  const { data } = await API.get(`${API_URL}/api/lessons/${id}`);
  return data;
};
