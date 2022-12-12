import API, { API_URL } from 'API';

export const getAllSubscriptions = async () => {
  const { data } = await API.get(`${API_URL}/api/subscriptions/`);
  return data;
};

export const createSubscription = async (subscription) => {
  const body = {
    teacher: {
      _id: subscription.teacher._id,
      fullName: subscription.teacher.fullName,
      email: subscription.teacher.email,
    },
    student: {
      _id: '638dd9d89bba73afdcd9f6f5',
      fullName: subscription.student.fullName,
      email: subscription.student.email,
    },
  };
  const { data } = await API.post(`${API_URL}/api/subscriptions/`, body);
  return data;
};

export const deleteSubscription = async (id) => {
  const { data } = await API.get(`${API_URL}/api/subscriptions/${id}`);
  return data;
};
