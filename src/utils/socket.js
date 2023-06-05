import { io } from 'socket.io-client';

const URL = process.env.BACKEND_URL || 'https://chess-backend-4pyi.onrender.com';

export const socket = io(URL);
