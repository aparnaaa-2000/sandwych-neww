import {createSlice} from '@reduxjs/toolkit';

export const NotificationListKey = 'NotificationList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: NotificationListKey,
  initialState,
  reducers: {
    NotificationListBegin: Notification => {
        Notification.isLoading = true;
    },

    NotificationListSuccess: (Notification, action) => {
        Notification.isLoading = false;
        Notification.data = action.payload;
        Notification.error = undefined;
    },

    NotificationListFailure: (Notification, action) => {
        Notification.isLoading = false;
        Notification.error = action.payload;
        Notification.data = undefined;
    },

    NotificationListClear: Notification => {
        Notification.isLoading = false;
        Notification.error = undefined;
        Notification.data = undefined;
    },
  },
});

export default slice.reducer;
export const {NotificationListBegin,NotificationListClear,NotificationListFailure,NotificationListSuccess} =
  slice.actions;
