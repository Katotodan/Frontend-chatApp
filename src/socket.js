import { io } from 'socket.io-client';

const serverUrl = process.env.REACT_APP_API_URL
const wssServerUrl = "wss" + serverUrl.slice(5)

export const socket = io(wssServerUrl, {
    withCredentials: true,
    headers: {
    'Content-Type': 'application/json',
    },
    autoConnect: false
});