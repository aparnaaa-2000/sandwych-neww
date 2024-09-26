import {createSlice} from '@reduxjs/toolkit';

export const ListMessageKey = 'ListMessageKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ListMessageKey,
  initialState,
  reducers: {
    ListMessageBegin: Message => {
        Message.isLoading = true;
    },

    ListMessageSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    ListMessageFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    ListMessageClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ListMessageBegin,ListMessageClear,ListMessageFailure,ListMessageSuccess} =
  slice.actions;
