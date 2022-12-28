import API from 'API';

export const getAllTransactions = async () => {
  const { data } = await API.get('/transactions');
  return data;
};
