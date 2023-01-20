import { API_URL } from 'API';
import io from 'socket.io-client';

export const socket = io.connect(API_URL);
