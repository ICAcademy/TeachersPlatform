import API from 'API';

export const sendPaymentData = async (paymentData) => {
  const { data } = await API.post('/api/liqpay', paymentData);
  return data;
};
