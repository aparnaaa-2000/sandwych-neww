import {createSlice} from '@reduxjs/toolkit';

export const ChatGroupListKey = 'ChatGroupList';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: ChatGroupListKey,
  initialState,
  reducers: {
    ChatGrouplistBegin: Chat => {
        Chat.isLoading = true;
    },

    ChatGrouplistSuccess: (Chat, action) => {
        Chat.isLoading = false;
        Chat.data = action.payload;
        Chat.error = undefined;
    },

    ChatGrouplistFailure: (Chat, action) => {
        Chat.isLoading = false;
        Chat.error = action.payload;
        Chat.data = undefined;
    },

    ChatGrouplistClear: Chat => {
        Chat.isLoading = false;
        Chat.error = undefined;
        Chat.data = undefined;
    },
  },
});

export default slice.reducer;
export const {ChatGrouplistBegin,ChatGrouplistClear,ChatGrouplistFailure,ChatGrouplistSuccess} =
  slice.actions;
