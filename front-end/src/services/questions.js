import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/questions';

export const getLevels = async () => {
  const { data } = await axios.get(`${baseUrl}/levels`);
  return data;
};

export const getUnitsByLevel = async (level) => {
  const { data } = await axios.get(`${baseUrl}/units`, { params: { level } });
  return data;
};
