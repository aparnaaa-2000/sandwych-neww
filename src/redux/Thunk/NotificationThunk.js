import { NotificationListBegin, NotificationListClear, NotificationListFailure, NotificationListSuccess } from '../Slice/Notification/NotificationListKey';
import { NotificationTokenBegin, NotificationTokenClear, NotificationTokenFailure, NotificationTokenSuccess } from '../Slice/Notification/NotificationTokenKey';
import { ReadNotificationBegin, ReadNotificationClear, ReadNotificationFailure, ReadNotificationSuccess } from '../Slice/Notification/ReadNotificationKey';

//initializing axios
const axios = require('axios').default;
const baseUrl = 'http://18.237.111.97:2000/api';

//UPDATE FCM TOKEN

export const UpdateFCMToken = async (
    User_id,
    Patient_id,
    Message,
    fcm_token,
    token,
    dispatch) => {
  
    dispatch(NotificationTokenClear())
    dispatch(NotificationTokenBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      User_id,
      Patient_id,
      Message,
      fcm_token,
    }

    try {
      const response = await axios.post(baseUrl + `/update-fcm-token`, req, {
        headers: headers
      });
  
      dispatch(NotificationTokenSuccess(response.data));
  
    } catch (error) {
      dispatch(NotificationTokenFailure(error?.response));
    }
  };
  

  //GET NOTIFICATION LIST
export const GetNotificationList = async (

    User_id,
    Patient_id,
    message,
    token,
    dispatch
  ) => {
    dispatch(NotificationListClear());
    dispatch(NotificationListBegin());
  
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      User_id,
      Patient_id,
      message
    };
   
    await axios
      .get(baseUrl + '/notifications', {
        headers: headers,
        params: req,
      })
  
      .then(res => {
        dispatch(NotificationListSuccess(res.data));
      })
      .catch(error => {
        dispatch(NotificationListFailure(error.response));
      });
  };

  //NOTIFICATION READ

  export const NotificationRead = async (
    notification_ids,
    token,
    dispatch) => {
  
      console.log("TOKEN......................",notification_ids)
    dispatch(ReadNotificationClear())
    dispatch(ReadNotificationBegin());
    // Set the Bearer token in the headers
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  
    const req = {
      notification_ids
    }
  
    console.log("REQUEST SUPPORT..................", req)
    try {
      const response = await axios.post(baseUrl + `/notifications/read`, req, {
        headers: headers
      });
  
      dispatch(ReadNotificationSuccess(response.data));
  
    } catch (error) {
      dispatch(ReadNotificationFailure(error?.response));
    }
  };