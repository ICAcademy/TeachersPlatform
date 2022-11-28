import axios from 'axios';

const baseUrl = '/api/materials';

export const getMaterialByUrl = async (url) => {
  try {
    const response = await axios.get(`${baseUrl}/get-material-by-url/${url}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//export const getLessonBody = async (lesson) => {};
