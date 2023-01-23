import API, { API_URL } from 'API';

export const getAllTodo = async (id) => {
  const { data } = await API.get(`${API_URL}/api/todo`, { params: { id } });
  return data;
};

export const changeTodoStatus = async (id, body) => {
  const { data } = await API.patch(`${API_URL}/api/todo/${id}`, body);
  return data;
};

export const deleteTodoById = async (id) => {
  const { data } = await API.delete(`${API_URL}/api/todo/${id}`);
  return data;
};
