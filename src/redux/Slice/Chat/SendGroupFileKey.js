import {createSlice} from '@reduxjs/toolkit';

export const SendGroupFileKey = 'SendGroupFileKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SendGroupFileKey,
  initialState,
  reducers: {
    SendGroupFileBegin: Message => {
        Message.isLoading = true;
    },

    SendGroupFileSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    SendGroupFileFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    SendGroupFileClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {SendGroupFileBegin,SendGroupFileClear,SendGroupFileFailure,SendGroupFileSuccess} =
  slice.actions;
