import API, { API_URL } from 'API';

export const starNewLesson = async (body) => {
  const { data } = await API.post(`${API_URL}/api/lessons`, body);
  return data;
};
