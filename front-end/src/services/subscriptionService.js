import API, { API_URL } from 'API';

export const getAllUserSubscriptions = async (id) => {
  const { data } = await API.get(`${API_URL}/api/subscriptions/user/${id}`);
  if (id === undefined) {
    return [];
  }
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
      _id: subscription.student.roleId,
      fullName: subscription.student.fullName,
      email: subscription.student.email,
    },
  };
  const { data } = await API.post(`${API_URL}/api/subscriptions/`, body);
  return data;
};

export const deleteSubscription = async (id) => {
  const { data } = await API.delete(`${API_URL}/api/subscriptions/${id}`);
  console.log('delete id', id);
  return data;
};
