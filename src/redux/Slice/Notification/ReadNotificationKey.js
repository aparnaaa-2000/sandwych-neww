import {createSlice} from '@reduxjs/toolkit';

export const ReadNotificationKey = 'ReadNotification';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ReadNotificationKey,
  initialState,
  reducers: {
    ReadNotificationBegin: Notification => {
        Notification.isLoading = true;
    },

    ReadNotificationSuccess: (Notification, action) => {
        Notification.isLoading = false;
        Notification.data = action.payload;
        Notification.error = undefined;
    },

    ReadNotificationFailure: (Notification, action) => {
        Notification.isLoading = false;
        Notification.error = action.payload;
        Notification.data = undefined;
    },

    ReadNotificationClear: Notification => {
        Notification.isLoading = false;
        Notification.error = undefined;
        Notification.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ReadNotificationBegin,ReadNotificationClear,ReadNotificationFailure,ReadNotificationSuccess} =
  slice.actions;
