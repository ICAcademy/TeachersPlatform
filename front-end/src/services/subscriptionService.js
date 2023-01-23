import API from 'API';

export const getTeachersSubscription = async (id) => {
  const { data } = await API.get(`/api/subscriptions/teacher-subscription/${id}`);
  return data;
};

export const getStudentSubscription = async (id) => {
  const { data } = await API.get(`/api/subscriptions/student-subscription/${id}`);
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
  const { data } = await API.post('/api/subscriptions/', body);
  return data;
};

export const deleteSubscription = async (id) => {
  const { data } = await API.delete(`/api/subscriptions/delete-subscription/${id}`);
  return data;
};

export const updateSubscription = async (id, subscription) => {
  const { data } = await API.patch(`/api/subscriptions/update-subscription/${id}`, subscription);
  return data;
};

export const getSubscriptionsCountByStatus = async (params) => {
  const { data } = await API.get('/api/subscriptions', { params });
  return data;
};
