import {createSlice} from '@reduxjs/toolkit';

export const UnReadMessageKey = 'UnReadMessageKey';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: UnReadMessageKey,
  initialState,
  reducers: {
    UnReadMessageBegin: Message => {
        Message.isLoading = true;
    },

    UnReadMessageSuccess: (Message, action) => {
        Message.isLoading = false;
        Message.data = action.payload;
        Message.error = undefined;
    },

    UnReadMessageFailure: (Message, action) => {
        Message.isLoading = false;
        Message.error = action.payload;
        Message.data = undefined;
    },

    UnReadMessageClear: Message => {
        Message.isLoading = false;
        Message.error = undefined;
        Message.data = undefined;
    },
  },
});

export default slice.reducer;
export const {UnReadMessageBegin,UnReadMessageClear,UnReadMessageFailure,UnReadMessageSuccess} =
  slice.actions;
