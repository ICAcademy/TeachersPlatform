import API from 'API';

export const getAllTransactions = async (page) => {
  const { data } = await API.get(`/transactions?page=${page}`);
  return data;
};
