import API from 'API';

export const getTeachersSubscription = async (id) => {
  const { data } = await API.get(`/api/subscriptions/teacher-subscription/${id}`);
  return data;
};

export const getStudentSubscription = async (id) => {
  const { data } = await API.get(`/api/subscriptions/student-subscription/${id}`);
  return data;
};

export const deleteSubscription = async (id) => {
  const { data } = await API.delete(`/api/subscriptions/delete-subscription/${id}`);
  return data;
};
