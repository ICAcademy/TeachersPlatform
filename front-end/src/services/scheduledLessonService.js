import API from 'API';

export const getAllScheduledLessons = async (id, minDate, maxDate) => {
  const { data } = await API.get('api/scheduled-lessons', {
    params: { id, minDate, maxDate },
  });
  return data;
};

export const scheduleLesson = async (body, params) => {
  const { data } = await API.post('api/scheduled-lessons', body, { params });
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
