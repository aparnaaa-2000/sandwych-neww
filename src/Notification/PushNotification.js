import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const CHANNEL_ID = '1';

// Function to get current time in ISO format
const getCurrentTime = () => new Date().toISOString();

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    console.log('Notification permission requested at:', getCurrentTime());
  } else {
    console.log('Notification permission not granted');
    console.log('Permission request failed at:', getCurrentTime());
  }
};

const getFcmTokenFromAsyncStorage = async () => {
  try {
    const fcmtoken = await AsyncStorage.getItem('fcmtoken');
    if (!fcmtoken) {
      try {
        const newFcmToken = await messaging().getToken();
        await AsyncStorage.setItem('fcmtoken', newFcmToken);
        console.log('New FCM token stored:', newFcmToken);
      } catch (error) {
        console.error('Failed to get FCM token', error);
      }
    } else {
      console.log('FCM token found:', fcmtoken);
    }
  } catch (error) {
    console.error('Failed to access AsyncStorage:', error);
  }
};

const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    console.log('New FCM token:', newFcmToken);
    return newFcmToken;
  } catch (error) {
    console.error('Failed to get FCM token', error);
    return null;
  }
};

// Handle foreground notifications
const handleForegroundNotifications = async (remoteMessage) => {
  console.log('Notification received in foreground at:', getCurrentTime());
  // Add your logic to handle the notification here
};

// Setup notification handlers
const setupNotificationHandlers = () => {
  messaging().onMessage(handleForegroundNotifications);
  
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Notification received in background at:', getCurrentTime());
    // Add your logic to handle the notification here
  });
  
  PushNotification.configure({
    onNotification: function(notification) {
      console.log('Notification displayed at:', getCurrentTime());
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    // Other configuration options
  });
};

export {
  getFcmToken,
  getFcmTokenFromAsyncStorage,
  requestUserPermission,
  setupNotificationHandlers,
};
