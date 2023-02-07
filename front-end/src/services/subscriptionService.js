import API from 'API';

export const getSubscriptionByQueries = async (params) => {
  const { data } = await API.get('/api/subscriptions', { params });
  return data;
};

export const getSubscriptionByStatus = async (params) => {
  const { data } = await API.get('/api/subscriptions/by-status/', { params });
  return data;
};

export const createSubscription = async (teacherId, studentId, email, fullName, teacherName) => {
  const body = {
    teacher: {
      _id: teacherId,
    },
    student: {
      _id: studentId,
    },
    email,
    fullName,
    teacherName,
  };
  const { data } = await API.post('/api/subscriptions', body);
  return data;
};

export const updateSubscription = async (id, subscription) => {
  const { data } = await API.patch(`/api/subscriptions/${id}`, subscription);
  return data;
};

export const deleteSubscription = async (id) => {
  const { data } = await API.delete(`/api/subscriptions/${id}`);
  return data;
};
