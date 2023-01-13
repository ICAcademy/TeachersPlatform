import io from 'socket.io-client';

let URL;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  URL = 'http://localhost:5000';
} else {
  URL = 'https://teacher-platform.onrender.com';
}

export const socket = io.connect(URL);
