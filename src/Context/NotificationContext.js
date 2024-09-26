import React, {createContext, useContext, useState} from 'react';

const NotificationContext = createContext();

export const useNotificationContext = () => useContext(NotificationContext);

export const NotificationProvider = ({children}) => {
  const [status, setStatus] = useState(null);

  return (
    <NotificationContext.Provider value={{status, setStatus}}>
      {children}
    </NotificationContext.Provider>
  );
};
