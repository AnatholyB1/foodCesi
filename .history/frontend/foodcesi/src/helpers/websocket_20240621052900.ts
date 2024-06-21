const ws = new WebSocket("ws://backend:8000");

ws.onerror = (error) => {
    console.log('WebSocket encountered an error: ', error);
  };

export default ws;
