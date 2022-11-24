import axios from 'axios';

const baseUrl = '/api/materials';

export const getLevels = async () => {
  try {
    const response = await axios.get(`${baseUrl}/get-levels`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUnitsByLevel = async (level) => {
  try {
    const response = await axios.get(`${baseUrl}/get-units-by-level/${level}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
