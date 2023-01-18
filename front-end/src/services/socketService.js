import io from 'socket.io-client';

let URL = 'https://teacher-platform.onrender.com';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  URL = 'http://localhost:5000';
}

export const socket = io.connect(URL);
