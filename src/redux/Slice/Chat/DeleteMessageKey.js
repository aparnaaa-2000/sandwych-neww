import {createSlice} from '@reduxjs/toolkit';

export const DeleteMessageKey = 'DeleteMessageKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: DeleteMessageKey,
  initialState,
  reducers: {
    DeleteMessageBegin: Message => {
        Message.isLoading = true;
    },

    DeleteMessageSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    DeleteMessageFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    DeleteMessageClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {DeleteMessageBegin,DeleteMessageClear,DeleteMessageFailure,DeleteMessageSuccess} =
  slice.actions;
