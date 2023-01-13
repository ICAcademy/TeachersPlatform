import API, { API_URL } from 'API';

export const getAllLessons = async (id) => {
  const { data } = await API.get(`${API_URL}/api/lessons`, { params: { id } });
  return data;
};

export const getSingleLessonById = async (id) => {
  const { data } = await API.get(`${API_URL}/api/lessons/${id}`);
  return data;
};

export const starNewLesson = async (body) => {
  const { data } = await API.post(`${API_URL}/api/lessons`, body);
  return data;
};

export const endLesson = async (id, body) => {
  const { data } = await API.patch(`${API_URL}/api/lessons/${id}`, body);
  return data;
};
