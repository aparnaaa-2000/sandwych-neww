import { useEffect } from 'react';
import RNCalendarEvents from 'react-native-calendar-events';

const useCalendarPermission = () => {
  useEffect(() => {
    const requestCalendarPermission = async () => {
      const permission = await RNCalendarEvents.requestPermissions();
      if (permission !== 'authorized') {
        console.log('Calendar permission denied');
      }
    };

    requestCalendarPermission();
  }, []);
};

export default useCalendarPermission;
