import {useState} from 'react';
import apiInstance from '../../instants/api';
import {useNotificationContext} from '../../Context/NotificationContext';

const useMarkAsRead = async data => {
  const {status, setStatus} = useNotificationContext();
  try {
    const responce = await apiInstance.post(`notifications/read`, data);

    console.log('sucessfully read the notification', responce?.data);
    setStatus(responce?.data?.status);

    return responce?.data;
  } catch (error) {
    console.log('error_code...', error);
  }
};

export default useMarkAsRead;
