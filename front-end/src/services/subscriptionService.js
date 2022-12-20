import API, { API_URL } from 'API';

export const subscriptionService = {
  getTeachersSubscription: async (id) => {
    const { data } = await API.get(`${API_URL}/api/subscriptions/teacher-subscription/${id}`);
    return data;
  },
  getStudentSubscription: async (id) => {
    const { data } = await API.get(`${API_URL}/api/subscriptions/student-subscription/${id}`);
    return data;
  },
  deleteSubscription: async (id) => {
    const { data } = await API.delete(`${API_URL}/api/subscriptions/delete-subscription/${id}`);
    return data;
  },
};
