import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

export const socket = io(URL,{
    withCredentials: true,
    extraHeaders: {
        'Access-Control-Allow-Origin': "https://chess-kage.vercel.app/",
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Credentials': true,
    },
}).connect();
