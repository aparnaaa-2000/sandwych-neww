import {useNavigation} from '@react-navigation/native';
import useMarkAsRead from '../apihooks/useMarkAsRead';
import useNotification from '../fnhooks/useNotifications';
import {useEffect} from 'react';

const useNavigations = () => {
  const navigation = useNavigation();
  const {notifications, loading, error} = useNotification();

  useEffect(() => {
    console.log(
      'notification_data_listing==================>',
      notifications?.data,
    );
  }, []);

  const NavigationFaq = () => {
    navigation.navigate('Faq');
  };

  const ChatRoomNav = data => {
    navigation.navigate('ChatRoom', {obj: data});
  };

  const NotificationNav = async () => {
    // Check if notifications data exists
    if (notifications?.data && Array.isArray(notifications.data)) {
      // Map through notifications and collect the notification ids
      const notification_ids = notifications.data.map(
        notification => notification.id,
      );

      console.log('NOTIFICATION_IDS___________________', notification_ids);

      const data = {
        notification_ids: notification_ids, // Pass the array of ids
      };

      try {
        const response = await useMarkAsRead(data);
        console.log('Response from marking as read:', response);
        navigation.navigate('NotificationPage');
      } catch (error) {
        console.log('Error while marking notifications as read:', error);
        navigation.navigate('NotificationPage');
      }
    }
  };
  const BackNavigation = () => {
    navigation.goBack();
  };

  return {
    NavigationFaq,
    ChatRoomNav,
    NotificationNav,
    BackNavigation,
  };
};

export default useNavigations;
