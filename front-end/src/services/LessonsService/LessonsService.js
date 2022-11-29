import axios from 'axios';

const baseUrl = 'http://localhost:5000/api';

export const getMaterialByUrl = async (url) => {
  try {
    const response = await axios.get(`${baseUrl}/materials/get-material-by-url/${url}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

//export const getLessonBody = async (lesson) => {};
