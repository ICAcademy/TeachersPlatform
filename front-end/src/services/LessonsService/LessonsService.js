import axios from 'axios';

const baseUrl = 'http://localhost:5000/api/materials';

export const getMaterialByUrl = async (url) => {
  const response = await axios.get(`${baseUrl}/get-material-by-url/${url}`);
  return response.data;
};

//export const getLessonBody = async (lesson) => {};
