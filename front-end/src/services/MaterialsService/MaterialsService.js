import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';

export const getLevels = async () => {
  try {
    const response = await axios.get(`${baseUrl}/levels`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUnitsByLevel = async (level) => {
  try {
    const response = await axios.get(`${baseUrl}/levels/get-units-by-level/${level}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
