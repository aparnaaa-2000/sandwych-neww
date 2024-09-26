import {createSlice} from '@reduxjs/toolkit';

export const SupportCompletionKey = 'SupportCompletion';

const initialState = {
  isLoading: false,
  data: undefined,
  error: undefined,
  Id: undefined,
};

const slice = createSlice({
  name: SupportCompletionKey,
  initialState,
  reducers: {
    supportCompletionBegin: support => {
        support.isLoading = true;
    },

    supportCompletionSuccess: (support, action) => {
        support.isLoading = false;
        support.data = action.payload;
        support.error = undefined;
    },

    supportCompletionFailure: (support, action) => {
        support.isLoading = false;
        support.error = action.payload;
        support.data = undefined;
    },
    supportCompletionClear: support => {
        support.isLoading = false;
        support.error = undefined;
        support.data = undefined;
    },
  },
});

export default slice.reducer;
export const {supportCompletionBegin,supportCompletionClear,supportCompletionFailure,supportCompletionSuccess} =
  slice.actions;
