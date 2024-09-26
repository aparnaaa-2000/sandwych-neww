import {createSlice} from '@reduxjs/toolkit';

export const ReadMessageKey = 'ReadMessageKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ReadMessageKey,
  initialState,
  reducers: {
    ReadMessageBegin: Message => {
        Message.isLoading = true;
    },

    ReadMessageSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    ReadMessageFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    ReadMessageClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ReadMessageBegin,ReadMessageClear,ReadMessageFailure,ReadMessageSuccess} =
  slice.actions;
