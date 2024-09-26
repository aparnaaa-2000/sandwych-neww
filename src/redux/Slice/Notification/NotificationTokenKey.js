import {createSlice} from '@reduxjs/toolkit';

export const NotificationTokenKey = 'NotificationToken';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: NotificationTokenKey,
  initialState,
  reducers: {
    NotificationTokenBegin: Notification => {
        Notification.isLoading = true;
    },

    NotificationTokenSuccess: (Notification, action) => {
        Notification.isLoading = false;
        Notification.data = action.payload;
        Notification.error = undefined;
    },

    NotificationTokenFailure: (Notification, action) => {
        Notification.isLoading = false;
        Notification.error = action.payload;
        Notification.data = undefined;
    },

    NotificationTokenClear: Notification => {
        Notification.isLoading = false;
        Notification.error = undefined;
        Notification.data = undefined;
    },
  },
});

export default slice.reducer;
export const {NotificationTokenBegin,NotificationTokenFailure,NotificationTokenClear,NotificationTokenSuccess} =
  slice.actions;
