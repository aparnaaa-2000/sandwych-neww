import {createSlice} from '@reduxjs/toolkit';

export const SendGroupMessageKey = 'SendGroupMessageKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SendGroupMessageKey,
  initialState,
  reducers: {
    SendGroupMessageBegin: Message => {
        Message.isLoading = true;
    },

    SendGroupMessageSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    SendGroupMessageFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    SendGroupMessageClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {SendGroupMessageBegin,SendGroupMessageClear,SendGroupMessageFailure,SendGroupMessageSuccess} =
  slice.actions;
