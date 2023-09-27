import React, { createContext, useContext, useEffect, useState } from 'react';

import { updatePushToken } from './services/NotificationsService';

const ConfigContext = createContext();

export function ConfigContextProvider({ children }) {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);

  return (
    <ConfigContext.Provider 
      value={{ 
        expoPushToken, 
        setExpoPushToken, 
        notification, 
        setNotification
      }}>
      {children}
    </ConfigContext.Provider>
  );
}

// Custom hook to consume the context
export function useConfigContext() {
  return useContext(ConfigContext);
}