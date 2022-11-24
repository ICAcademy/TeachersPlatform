import axios from 'axios';

export const sendUserData = (data) => axios.post('http://localhost:5000/auth/register', data);

export const loginUser = (data) => axios.post('http://localhost:5000/auth/login', data);
