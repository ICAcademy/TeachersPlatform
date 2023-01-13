import io from 'socket.io-client';

const URL = 'https://teacher-platform.onrender.com';

export const socket = io.connect(URL);
