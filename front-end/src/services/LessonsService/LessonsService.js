import API from 'API';

export const getMaterialByUrl = async (url) => {
  const response = await API.get(`/api/materials/get-material-by-url/${url}`);
  return response.data;
};

//export const getLessonBody = async (lesson) => {};
