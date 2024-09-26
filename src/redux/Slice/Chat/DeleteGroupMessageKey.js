import {createSlice} from '@reduxjs/toolkit';

export const DeleteGroupMessageKey = 'DeleteGroupMessageKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: DeleteGroupMessageKey,
  initialState,
  reducers: {
    DeleteGroupMessageBegin: Message => {
        Message.isLoading = true;
    },

    DeleteGroupMessageSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    DeleteGroupMessageFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    DeleteGroupMessageClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {DeleteGroupMessageBegin,DeleteGroupMessageClear,DeleteGroupMessageFailure,DeleteGroupMessageSuccess} =
  slice.actions;
