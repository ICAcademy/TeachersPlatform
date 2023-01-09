import API from 'API';

export const getTeachersSubscription = async (id) => {
  const { data } = await API.get(`/api/subscriptions/teacher-subscription/${id}`);
  return data;
};

export const getStudentSubscription = async (id) => {
  const { data } = await API.get(`/api/subscriptions/student-subscription/${id}`);
  return data;
};

export const createSubscription = async (
  teacherId,
  studentId,
  email,
  fullName,
  registrationOrSubscription,
  teacherName,
) => {
  const body = {
    teacher: {
      _id: teacherId,
    },
    student: {
      _id: studentId,
    },
    sendEmail: {
      email,
      fullName,
      registrationOrSubscription,
      teacherName,
    },
  };
  const { data } = await API.post('/api/subscriptions/', body);
  return data;
};

export const deleteSubscription = async (id) => {
  const { data } = await API.delete(`/api/subscriptions/delete-subscription/${id}`);
  return data;
};
