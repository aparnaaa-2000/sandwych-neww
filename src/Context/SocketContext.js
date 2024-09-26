import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Replace with your server's IP address or domain
const SERVER_URL = 'http://192.168.137.54:3000';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket,  
 setSocket] = useState(null);
  const  
 [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(SERVER_URL, {
      transports: ['websocket'],
      autoConnect: false, // Prevent automatic connection
    });
    //console.log("socket called",newSocket)
   // setSocket(newSocket);

    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);
      setConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    // Manually connect to the server when the component mounts
    socketInstance.connect();

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};