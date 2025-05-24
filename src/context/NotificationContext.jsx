import { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [modal, setModal] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const hideNotification = () => {
    setNotification(null);
  };
  
  const showModal = (title, message, type = 'info') => {
    setModal({ title, message, type });
  };
  
  const hideModal = () => {
    setModal(null);
  };

  return (
    <NotificationContext.Provider 
      value={{ 
        notification, 
        showNotification, 
        hideNotification,
        modal,
        showModal,
        hideModal
      }}
    >
      {children}
      
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg transition-all transform ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white max-w-md z-50`}>
          <div className="flex justify-between items-center">
            <p>{notification.message}</p>
            <button 
              onClick={hideNotification}
              className="ml-4 text-white hover:text-gray-200"
            >
              &times;
            </button>
          </div>
        </div>
      )}
      
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow p-6 max-w-sm mx-4 text-center">
            <h3 className="text-lg font-medium mb-2">{modal.title || 'Thông báo'}</h3>
            <p className="text-gray-700 mb-4">{modal.message}</p>
            <button
              onClick={hideModal}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
