import {createSlice} from '@reduxjs/toolkit';

export const ListGroupMessageKey = 'ListGroupMessageKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ListGroupMessageKey,
  initialState,
  reducers: {
    ListGroupMessageBegin: Message => {
        Message.isLoading = true;
    },

    ListGroupMessageSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    ListGroupMessageFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    ListGroupMessageClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ListGroupMessageBegin,ListGroupMessageClear,ListGroupMessageFailure,ListGroupMessageSuccess} =
  slice.actions;
