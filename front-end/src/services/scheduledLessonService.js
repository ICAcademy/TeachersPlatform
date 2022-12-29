import API from 'API';

export const getAllScheduledLessons = async (minDate, maxDate) => {
  const { data } = await API.get('api/scheduled-lessons', { params: { minDate, maxDate } });
  return data;
};

export const scheduleLesson = async (lesson) => {
  const { data } = await API.post('api/scheduled-lessons', lesson);
  return data;
};

export const updateScheduledLesson = async (id, body) => {
  const { data } = await API.patch(`api/scheduled-lessons/${id}`, body);
  return data;
};

export const deleteScheduledLesson = async (id) => {
  const { data } = await API.delete(`api/scheduled-lessons/${id}`);
  return data;
};
