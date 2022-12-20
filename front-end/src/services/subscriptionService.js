import API from 'API';

export const subscriptionService = {
  getTeachersSubscription: async (id) => {
    const { data } = await API.get(`/api/subscriptions/teacher-subscription/${id}`);
    return data;
  },
  getStudentSubscription: async (id) => {
    const { data } = await API.get(`/api/subscriptions/student-subscription/${id}`);
    return data;
  },
  deleteSubscription: async (id) => {
    const { data } = await API.delete(`/api/subscriptions/delete-subscription/${id}`);
    return data;
  },
};
