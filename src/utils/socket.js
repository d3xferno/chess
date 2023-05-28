import { io } from 'socket.io-client';

const URL =process.env.BACKEND_URL || 'http://localhost:3000';

export const socket = io(URL);

// 'https://chess-server-92na.onrender.com'