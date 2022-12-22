import API, { API_URL } from 'API';

export const getTeachersSubscription = async (id) => {
  const { data } = await API.get(`/api/subscriptions/teacher-subscription/${id}`);
  return data;
};

export const getStudentSubscription = async (id) => {
  const { data } = await API.get(`/api/subscriptions/student-subscription/${id}`);
  return data;
};

export const createSubscription = async (subscription) => {
  const body = {
    teacher: {
      _id: subscription.teacher._id,
    },
    student: {
      _id: subscription.student.roleId,
    },
  };
  const { data } = await API.post(`${API_URL}/api/subscriptions/`, body);
  return data;
};

export const deleteSubscription = async (id) => {
  const { data } = await API.delete(`${API_URL}/api/subscriptions/delete-subscription/${id}`);
  return data;
};
