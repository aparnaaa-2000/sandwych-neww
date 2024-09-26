import React, {useState, useEffect} from 'react';
import {LogBox, Text, TextInput, Alert} from 'react-native';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import { View, StyleSheet } from 'react-native';
// import Slider from '@react-native-community/slider';
// import 'react-native-gesture-handler';

import NetInfo from '@react-native-community/netinfo';
import AuthStack from './src/Navigation/Main/authstack';

import {
  requestUserPermission,
  getFcmTokenFromAsyncStorage,
} from './src/Notification/PushNotification';

import messaging from '@react-native-firebase/messaging';
import { SocketProvider } from './src/Context/SocketContext';
export const navigationRef = createNavigationContainerRef();
import { createNavigationContainerRef } from '@react-navigation/native';
import {NotificationProvider} from './src/Context/NotificationContext';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

if (Text.defaultProps == null) {
  // To disable the device fontsize
  Text.defaultProps = {};
  Text.defaultProps.allowFontScaling = false;
}

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
  TextInput.defaultProps.allowFontScaling = false;
}

const App = () => {
  // const [isConnected, setIsConnected] = useState(true);
  // const [dailyLivingValue, setDailyLivingValue] = useState(0);
  // const [tasksValue, setTasksValue] = useState(0);
  // const [medicationsValue, setMedicationsValue] = useState(0);

  // const getSliderLabel = (value) => {
  //   if (value === 0) {
  //     return 'No, they are independent';
  //   } else if (value === 0.5) {
  //     return 'I’m concerned	for their health and safety';
  //   } else {
  //     return 'Yes they need help';
  //   }
  // };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    requestUserPermission()
    getFcmTokenFromAsyncStorage()
    // Cleanup function
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    // Handle notification when the app is in the background and clicked
    const unsubscribeBackground = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);
      if (remoteMessage && remoteMessage.notification) {
        navigationRef.current?.navigate('NotificationList');
      }
    });
  
    // Handle notification when the app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        console.log('Initial notification:', remoteMessage);
        if (remoteMessage && remoteMessage.notification) {
          navigationRef.current?.navigate('NotificationList');
        }
      });
  
    // Foreground notification handler
    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      // Handle foreground notification (e.g., show an alert)
    });
  
    return () => {
      unsubscribeBackground();
      unsubscribeForeground();
    };
  }, []);
  

  // useEffect(() => {
  //   // Handle notification when the app is in the background and clicked
  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('Notification caused app to open from background state:', remoteMessage.notification);
  //     // Navigate to the notification screen
  //     if (remoteMessage) {
  //       navigationRef.current?.navigate('NotificationList');
  //     }
  //   });

  //   // Handle notification when the app is opened from a quit state
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log('Notification caused app to open from quit state:', remoteMessage.notification);
  //         // Navigate to the notification screen
  //         navigationRef.current?.navigate('NotificationList');
  //       }
  //     });

  //   // Foreground notification handler
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     console.log('A new FCM message arrived!', remoteMessage);
  //     // You can show an alert or update UI here
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <Provider store={store}>
      <SocketProvider>
      <PersistGate loading={null} persistor={persistor}>
      <NotificationProvider>
            <AuthStack />
{/* 
            <View style={styles.container}>
      <Text style={styles.header}>Types of sources and assistance</Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.5}
        minimumTrackTintColor="#00b300"
        maximumTrackTintColor="#ff1a1a"
        thumbTintColor="#000"
        value={dailyLivingValue}
        onValueChange={(value) => setDailyLivingValue(value)}
      />
      <Text style={styles.label}>{getSliderLabel(dailyLivingValue)}	</Text>


      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.5}
        minimumTrackTintColor="#00b300"
        maximumTrackTintColor="#ff1a1a"
        thumbTintColor="#000"
        value={tasksValue}
        onValueChange={(value) => setTasksValue(value)}
      />
      <Text style={styles.label}>{getSliderLabel(tasksValue)}</Text>


      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.5}
        minimumTrackTintColor="#00b300"
        maximumTrackTintColor="#ff1a1a"
        thumbTintColor="#000"
        value={medicationsValue}
        onValueChange={(value) => setMedicationsValue(value)}
      />
      <Text style={styles.label}>{getSliderLabel(medicationsValue)}</Text>
   
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={1}
        step={0.5}
        minimumTrackTintColor="#00b300"
        maximumTrackTintColor="#ff1a1a"
        thumbTintColor="#000"
        value={medicationsValue}
        onValueChange={(value) => setMedicationsValue(value)}
      />
      <Text style={styles.label}>{getSliderLabel(medicationsValue)}</Text>
    </View> */}
          </NotificationProvider>
        
      </PersistGate>
      </SocketProvider>
    </Provider>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
    color:'black',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:'black',
  },
  question: {
    fontSize: 18,
    marginTop: 20,
    color:'black',
  },
  slider: {
    width: '100%',
    height: 40,
    color:'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color:'black',
  },
});
