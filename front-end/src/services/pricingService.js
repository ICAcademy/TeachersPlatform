import API from 'API';

export const getAllPricing = async () => {
  const { data } = await API.get('/api/pricing');
  return data;
};
