import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8000 });

export default wss;