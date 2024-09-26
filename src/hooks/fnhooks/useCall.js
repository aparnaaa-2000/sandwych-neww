import { useCallback } from "react";
import { Linking, Platform } from "react-native";

const useCall = () => {
  const openDialer = useCallback((phoneNumber) => {
    const dialerURL = Platform.OS === 'android' ? `tel:${phoneNumber}` : `telprompt:${phoneNumber}`;

    Linking.openURL(dialerURL)
      .then((result) => {
        if (result) {
          console.log(`Dialer opened successfully for number: ${phoneNumber}`);
        } else {
          console.error('Failed to open dialer.');
        }
      })
      .catch((error) => {
        console.error(`Error opening dialer: ${error}`);
      });
  }, []);

  return {
    openDialer,
  };
};

export default useCall;
