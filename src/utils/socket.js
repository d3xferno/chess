import { io } from 'socket.io-client';

const URL = 'https://chess-server-92na.onrender.com'

export const socket = io(URL,{
    withCredentials: true,
    extraHeaders: {
        'Access-Control-Allow-Origin': "https://chess-shajith-git-main-d3xferno.vercel.app/",
        'Access-Control-Allow-Methods': 'GET, POST',
        'Access-Control-Allow-Credentials': true,
    },
}).connect();
