import {createSlice} from '@reduxjs/toolkit';

export const SendMessageKey = 'SendMessageKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SendMessageKey,
  initialState,
  reducers: {
    SendMessageBegin: Message => {
        Message.isLoading = true;
    },

    SendMessageSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    SendMessageFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    SendMessageClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {SendMessageBegin,SendMessageClear,SendMessageFailure,SendMessageSuccess} =
  slice.actions;
