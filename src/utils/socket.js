import { io } from 'socket.io-client';

const URL = process.env.NODE_URL || 'http://localhost:3000'

export const socket = io(URL,{
    withCredentials: true,
    extraHeaders: {
        'Access-Control-Allow-Origin': "chess-kage-git-main-d3xferno.vercel.app",
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Credentials': true,
    },
}).connect();
