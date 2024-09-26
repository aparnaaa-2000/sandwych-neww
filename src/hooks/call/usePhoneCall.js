import { useCallback } from 'react';
import call from 'react-native-phone-call';

const usePhoneCall = () => {
  const makePhoneCall = useCallback((phoneNumber) => {
    if (!phoneNumber) {
      console.error('Phone number is required to make a call');
      return;
    }

    // Remove any non-numeric characters (except the '+' for international numbers)
    const sanitizedNumber = phoneNumber.replace(/[^0-9+]/g, '');

    const args = {
      number: sanitizedNumber, // String value with the sanitized number to call
      prompt: true,            // Optional boolean property. If `true`, the user will be prompted prior to the call
    };

    call(args).catch((error) => {
      console.error('Failed to make a call:', error);
    });
  }, []);

  return {
    makePhoneCall,
  };
};

export default usePhoneCall;
