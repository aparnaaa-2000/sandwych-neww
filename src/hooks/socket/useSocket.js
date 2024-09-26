import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.137.240:3000'; // Use your machine's IP address

const useSocket = () => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'], // Use WebSocket transport for better compatibility
      reconnectionAttempts: 5,    // Number of reconnection attempts
      timeout: 10000,             // Timeout for the connection
    });

    // Connection event
    newSocket.on('connect', () => {
      console.log('Connected to the socket server:', newSocket.id);
      setConnected(true);
    });

    // Error event
    newSocket.on('connect_error', (error) => {
      console.error('Connection Error:', error);
      setConnected(false);
    });

    // Disconnect event
    newSocket.on('disconnect', (reason) => {
      console.warn('Disconnected from the socket server:', reason);
      setConnected(false);
    });

    // Clean up the socket connection on component unmount
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { socket, connected };
};

export default useSocket;
