import {createSlice} from '@reduxjs/toolkit';

export const SendFileKey = 'SendFileKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SendFileKey,
  initialState,
  reducers: {
    SendFileBegin: Message => {
        Message.isLoading = true;
    },

    SendFileSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    SendFileFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    SendFileClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {SendFileBegin,SendFileClear,SendFileFailure,SendFileSuccess} =
  slice.actions;
