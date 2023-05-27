import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'https://chess-server-92na.onrender.com';

export const socket = io(URL,{
    withCredentials: true,
    extraHeaders: {
        'Access-Control-Allow-Origin': "https://chess-kage.vercel.app/",
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Credentials': true,
    },
}).connect();
