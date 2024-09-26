import apiInstance from '../../instants/api';

const useNotificationList = async () => {
  try {
    const notifyresponse = apiInstance.get(`/notifications`);
    
    console.log('notification response....', notifyresponse);

    return (await notifyresponse).data;
  } catch (error) {
    console.log('notification error code...', error);

    throw error;
  }
};


export default useNotificationList;