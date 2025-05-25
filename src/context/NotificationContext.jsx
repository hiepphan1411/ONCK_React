import { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  return (
    <NotificationContext.Provider 
      value={{ 
        notification, 
        showNotification, 
      }}
    >
      {children}
      
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg transition-all transform ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white max-w-md z-50`}>
          <div className="flex justify-between items-center">
            <p>{notification.message}</p>
          </div>
        </div>
      )}
      
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
