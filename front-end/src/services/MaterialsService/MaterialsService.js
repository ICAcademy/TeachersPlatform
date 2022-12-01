import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';

export const getLevels = async () => {
  const response = await axios.get(`${baseUrl}/materials-levels`);
  return response.data;
};

export const getUnitsByLevel = async (level) => {
  const response = await axios.get(`${baseUrl}/materials-levels/get-units-by-level/${level}`);
  return response.data;
};