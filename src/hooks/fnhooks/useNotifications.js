import { useState, useEffect } from 'react';
import useNotificationList from '../apihooks/useNotificationList';

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lenght , setLenght] = useState(null)

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const data = await useNotificationList();
        console.log('notification.....' , data);
        setNotifications(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchNotification();

    // Fetch notifications periodically or listen for real-time updates
    const intervalId = setInterval(fetchNotification, 60000); // Poll every minute

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, []);

  return { notifications, loading, error };
};

export default useNotification;
