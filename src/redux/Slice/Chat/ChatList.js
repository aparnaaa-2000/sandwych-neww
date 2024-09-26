import {createSlice} from '@reduxjs/toolkit';

export const ChatlistKey = 'ChatList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ChatlistKey,
  initialState,
  reducers: {
    ChatlistBegin: Chat => {
        Chat.isLoading = true;
    },

    ChatlistSuccess: (Chat, action) => {
        Chat.isLoading = false;
        Chat.data = action.payload;
        Chat.error = undefined;
    },

    ChatlistFailure: (Chat, action) => {
        Chat.isLoading = false;
        Chat.error = action.payload;
        Chat.data = undefined;
    },

    ChatlistClear: Chat => {
        Chat.isLoading = false;
        Chat.error = undefined;
        Chat.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ChatlistBegin,ChatlistClear,ChatlistFailure,ChatlistSuccess} =
  slice.actions;
